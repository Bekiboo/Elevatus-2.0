import { error, fail, redirect } from '@sveltejs/kit'
import { asc, desc, eq } from 'drizzle-orm'
import { getDb, pgErrorCode } from '$lib/server/db'
import { beneficiaries, enrollments, schools, schoolYears } from '$lib/server/db/schema'
import { childSchema, enrollmentSchema, formErrors, outcomeSchema } from '$lib/portal/validation'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params }) => {
	const db = getDb()
	const [child] = await db.select().from(beneficiaries).where(eq(beneficiaries.id, params.id))
	if (!child) error(404, 'Enfant introuvable')

	const [childEnrollments, allYears, allSchools] = await Promise.all([
		db
			.select({
				id: enrollments.id,
				grade: enrollments.grade,
				isSponsored: enrollments.isSponsored,
				completedYear: enrollments.completedYear,
				promoted: enrollments.promoted,
				schoolYearId: enrollments.schoolYearId,
				yearLabel: schoolYears.label,
				schoolName: schools.name
			})
			.from(enrollments)
			.innerJoin(schoolYears, eq(schoolYears.id, enrollments.schoolYearId))
			.innerJoin(schools, eq(schools.id, enrollments.schoolId))
			.where(eq(enrollments.beneficiaryId, params.id))
			.orderBy(desc(schoolYears.startsOn)),
		db.select().from(schoolYears).orderBy(desc(schoolYears.startsOn)),
		db
			.select()
			.from(schools)
			.where(eq(schools.archived, false))
			.orderBy(asc(schools.name))
	])

	return { child, enrollments: childEnrollments, years: allYears, schools: allSchools }
}

export const actions: Actions = {
	update: async ({ request, params }) => {
		const form = await request.formData()
		const parsed = childSchema.safeParse(Object.fromEntries(form))
		if (!parsed.success) {
			return fail(400, { formId: 'update', error: formErrors(parsed.error) })
		}
		const db = getDb()
		await db.update(beneficiaries).set(parsed.data).where(eq(beneficiaries.id, params.id))
		return { formId: 'update', success: true }
	},

	toggleArchive: async ({ params }) => {
		const db = getDb()
		const [child] = await db
			.select({ archived: beneficiaries.archived })
			.from(beneficiaries)
			.where(eq(beneficiaries.id, params.id))
		if (!child) error(404)
		await db
			.update(beneficiaries)
			.set({ archived: !child.archived })
			.where(eq(beneficiaries.id, params.id))
		return { formId: 'archive', success: true }
	},

	addEnrollment: async ({ request, params }) => {
		const form = await request.formData()
		const parsed = enrollmentSchema.safeParse(Object.fromEntries(form))
		if (!parsed.success) {
			return fail(400, { formId: 'addEnrollment', error: formErrors(parsed.error) })
		}
		const db = getDb()
		try {
			await db.insert(enrollments).values({ ...parsed.data, beneficiaryId: params.id })
		} catch (e) {
			if (pgErrorCode(e) === '23505') {
				return fail(400, {
					formId: 'addEnrollment',
					error: 'Cet enfant est déjà inscrit pour cette année scolaire.'
				})
			}
			// 23503 : année ou école supprimée entre-temps (page restée ouverte)
			if (pgErrorCode(e) === '23503') {
				return fail(400, {
					formId: 'addEnrollment',
					error: "Cette année scolaire ou cette école n'existe plus — recharge la page."
				})
			}
			throw e
		}
		return { formId: 'addEnrollment', success: true }
	},

	updateOutcome: async ({ request, params }) => {
		const form = await request.formData()
		const parsed = outcomeSchema.safeParse(Object.fromEntries(form))
		if (!parsed.success) {
			return fail(400, { formId: 'outcome', error: formErrors(parsed.error) })
		}
		const { enrollmentId, completedYear, promoted } = parsed.data
		const db = getDb()
		await db
			.update(enrollments)
			.set({ completedYear, promoted })
			.where(eq(enrollments.id, enrollmentId))
		return { formId: `outcome-${enrollmentId}`, success: true }
	},

	deleteEnrollment: async ({ request }) => {
		const form = await request.formData()
		const enrollmentId = String(form.get('enrollmentId') ?? '')
		if (!enrollmentId) return fail(400, { formId: 'enrollments', error: 'Inscription invalide.' })
		const db = getDb()
		await db.delete(enrollments).where(eq(enrollments.id, enrollmentId))
		return { formId: 'enrollments', success: true }
	},

	delete: async ({ params }) => {
		const db = getDb()
		await db.delete(beneficiaries).where(eq(beneficiaries.id, params.id))
		redirect(303, '/portal/children')
	}
}
