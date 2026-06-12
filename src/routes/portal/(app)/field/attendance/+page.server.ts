import { fail } from '@sveltejs/kit'
import { asc, desc, eq, inArray } from 'drizzle-orm'
import { getDb, pgErrorCode } from '$lib/server/db'
import { courseAttendance, courses } from '$lib/server/db/schema'
import { currentMonthInMadagascar } from '$lib/server/portal'
import { attendanceSchema, parseForm } from '$lib/portal/validation'
import type { Actions, PageServerLoad } from './$types'

const MONTH_RE = /^\d{4}-(0[1-9]|1[0-2])$/

export const load: PageServerLoad = async ({ url }) => {
	const db = getDb()
	const currentMonth = currentMonthInMadagascar()
	const moisParam = url.searchParams.get('mois')
	const month = moisParam && MONTH_RE.test(moisParam) ? moisParam : currentMonth

	const [allCourses, monthRows, recentMonths] = await Promise.all([
		db.select().from(courses).where(eq(courses.archived, false)).orderBy(asc(courses.name)),
		db.select().from(courseAttendance).where(eq(courseAttendance.month, month)),
		db
			.selectDistinct({ month: courseAttendance.month })
			.from(courseAttendance)
			.orderBy(desc(courseAttendance.month))
			.limit(6)
	])

	// Historique compact : les 6 derniers mois saisis, classes en colonnes.
	// Requête bornée à ces mois-là, quel que soit l'historique accumulé.
	const historyMonths = recentMonths.map((r) => r.month)
	const historyRows = historyMonths.length
		? await db
				.select({
					courseId: courseAttendance.courseId,
					month: courseAttendance.month,
					averageAttendance: courseAttendance.averageAttendance
				})
				.from(courseAttendance)
				.where(inArray(courseAttendance.month, historyMonths))
		: []
	const history = historyMonths.map((m) => ({
		month: m,
		byCourse: Object.fromEntries(
			historyRows.filter((r) => r.month === m).map((r) => [r.courseId, r.averageAttendance])
		) as Record<string, string>
	}))

	return {
		courses: allCourses,
		month,
		currentMonth,
		entries: Object.fromEntries(monthRows.map((r) => [r.courseId, r])),
		history
	}
}

export const actions: Actions = {
	save: async ({ request, locals }) => {
		const formData = await request.formData()
		const fallbackId = String(formData.get('courseId') ?? 'unknown')
		const parsed = parseForm(attendanceSchema, formData, `a-${fallbackId}`)
		if (!parsed.ok) return parsed.failure
		const { courseId, month, averageAttendance, sessionsHeld, notes } = parsed.data
		const db = getDb()
		const recordedBy = locals.user?.id ?? null
		try {
			await db
				.insert(courseAttendance)
				.values({
					courseId,
					month,
					averageAttendance: String(averageAttendance),
					sessionsHeld,
					notes,
					recordedBy
				})
				.onConflictDoUpdate({
					target: [courseAttendance.courseId, courseAttendance.month],
					// $onUpdate ne s'applique pas aux upserts : updatedAt explicite.
					set: {
						averageAttendance: String(averageAttendance),
						sessionsHeld,
						notes,
						recordedBy,
						updatedAt: new Date()
					}
				})
		} catch (e) {
			// 23503 : classe supprimée/renommée entre-temps (page restée ouverte)
			if (pgErrorCode(e) === '23503') {
				return fail(400, {
					formId: `a-${courseId}`,
					error: "Cette classe n'existe plus — recharge la page."
				})
			}
			throw e
		}
		return { formId: `a-${courseId}`, success: true }
	}
}
