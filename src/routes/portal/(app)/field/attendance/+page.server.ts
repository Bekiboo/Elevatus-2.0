import { fail } from '@sveltejs/kit'
import { asc, desc, eq } from 'drizzle-orm'
import { getDb } from '$lib/server/db'
import { courseAttendance, courses } from '$lib/server/db/schema'
import { currentMonthInMadagascar } from '$lib/server/portal'
import { attendanceSchema, formErrors } from '$lib/portal/validation'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
	const db = getDb()
	const allCourses = await db
		.select()
		.from(courses)
		.where(eq(courses.archived, false))
		.orderBy(asc(courses.name))

	const currentMonth = currentMonthInMadagascar()
	const month = /^\d{4}-(0[1-9]|1[0-2])$/.test(url.searchParams.get('mois') ?? '')
		? url.searchParams.get('mois')!
		: currentMonth

	const rows = await db
		.select()
		.from(courseAttendance)
		.orderBy(desc(courseAttendance.month))

	const monthRows = new Map(rows.filter((r) => r.month === month).map((r) => [r.courseId, r]))

	// Historique compact : les 6 derniers mois saisis, classes en colonnes
	const historyMonths = [...new Set(rows.map((r) => r.month))].slice(0, 6)
	const history = historyMonths.map((m) => ({
		month: m,
		byCourse: Object.fromEntries(
			rows.filter((r) => r.month === m).map((r) => [r.courseId, r.averageAttendance])
		) as Record<string, string>
	}))

	return {
		courses: allCourses,
		month,
		currentMonth,
		entries: Object.fromEntries(monthRows),
		history
	}
}

export const actions: Actions = {
	save: async ({ request, locals }) => {
		const form = await request.formData()
		const parsed = attendanceSchema.safeParse(Object.fromEntries(form))
		if (!parsed.success) {
			return fail(400, {
				formId: `a-${form.get('courseId')}`,
				error: formErrors(parsed.error)
			})
		}
		const { courseId, month, averageAttendance, sessionsHeld, notes } = parsed.data
		const db = getDb()
		await db
			.insert(courseAttendance)
			.values({
				courseId,
				month,
				averageAttendance: String(averageAttendance),
				sessionsHeld,
				notes,
				recordedBy: locals.user?.id ?? null
			})
			.onConflictDoUpdate({
				target: [courseAttendance.courseId, courseAttendance.month],
				set: {
					averageAttendance: String(averageAttendance),
					sessionsHeld,
					notes,
					recordedBy: locals.user?.id ?? null
				}
			})
		return { formId: `a-${courseId}`, success: true }
	}
}
