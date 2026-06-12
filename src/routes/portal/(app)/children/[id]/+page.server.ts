import { error, fail, redirect } from '@sveltejs/kit'
import { asc, desc, eq } from 'drizzle-orm'
import { getDb, pgErrorCode } from '$lib/server/db'
import { beneficiaries, enrollments, schools, schoolYears } from '$lib/server/db/schema'
import { getActiveSchools, requireAdmin } from '$lib/server/portal'
import { childSchema, enrollmentSchema, isUuid, outcomeSchema, parseForm } from '$lib/portal/validation'
import type { Actions, PageServerLoad } from './$types'

// Un uuid invalide dans l'URL ferait un 500 Postgres (22P02) — on veut un 404.
function childIdOr404(id: string): string {
	if (!isUuid(id)) error(404, 'Enfant introuvable')
	return id
}

export const load: PageServerLoad = async ({ params }) => {
	const id = childIdOr404(params.id)
	const db = getDb()
	const [child] = await db.select().from(beneficiaries).where(eq(beneficiaries.id, id))
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
			.where(eq(enrollments.beneficiaryId, id))
			.orderBy(desc(schoolYears.startsOn)),
		db.select().from(schoolYears).orderBy(desc(schoolYears.startsOn)),
		getActiveSchools(db)
	])

	return { child, enrollments: childEnrollments, years: allYears, schools: allSchools }
}

export const actions: Actions = {
	update: async ({ request, params }) => {
		const id = childIdOr404(params.id)
		const parsed = parseForm(childSchema, await request.formData(), 'update')
		if (!parsed.ok) return parsed.failure
		const db = getDb()
		await db.update(beneficiaries).set(parsed.data).where(eq(beneficiaries.id, id))
		return { formId: 'update', success: true }
	},

	toggleArchive: async ({ params }) => {
		const id = childIdOr404(params.id)
		const db = getDb()
		const [child] = await db
			.select({ archived: beneficiaries.archived })
			.from(beneficiaries)
			.where(eq(beneficiaries.id, id))
		if (!child) error(404)
		await db.update(beneficiaries).set({ archived: !child.archived }).where(eq(beneficiaries.id, id))
		return { formId: 'archive', success: true }
	},

	addEnrollment: async ({ request, params }) => {
		const id = childIdOr404(params.id)
		const parsed = parseForm(enrollmentSchema, await request.formData(), 'addEnrollment')
		if (!parsed.ok) return parsed.failure
		const db = getDb()
		try {
			await db.insert(enrollments).values({ ...parsed.data, beneficiaryId: id })
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

	updateOutcome: async ({ request }) => {
		const parsed = parseForm(outcomeSchema, await request.formData(), 'outcome')
		if (!parsed.ok) return parsed.failure
		const { enrollmentId, completedYear, promoted } = parsed.data
		const db = getDb()
		await db
			.update(enrollments)
			.set({ completedYear, promoted })
			.where(eq(enrollments.id, enrollmentId))
		return { formId: `outcome-${enrollmentId}`, success: true }
	},

	deleteEnrollment: async ({ request, locals }) => {
		const form = await request.formData()
		const enrollmentId = String(form.get('enrollmentId') ?? '')
		if (!isUuid(enrollmentId)) {
			return fail(400, { formId: 'enrollments', error: 'Inscription invalide.' })
		}
		const db = getDb()
		const [row] = await db
			.select({ completedYear: enrollments.completedYear, promoted: enrollments.promoted })
			.from(enrollments)
			.where(eq(enrollments.id, enrollmentId))
		if (!row) return { formId: 'enrollments', success: true }
		// Une inscription avec des résultats saisis fait partie de l'historique
		// des indicateurs : seul un admin peut la supprimer.
		if ((row.completedYear !== null || row.promoted !== null) && locals.user?.role !== 'admin') {
			return fail(403, {
				formId: 'enrollments',
				error: 'Cette inscription a des résultats enregistrés — suppression réservée aux admins.'
			})
		}
		await db.delete(enrollments).where(eq(enrollments.id, enrollmentId))
		return { formId: 'enrollments', success: true }
	},

	// Suppression définitive (cascade sur toute la scolarité) : admin uniquement.
	// Le cas normal est l'archivage — ceci ne sert qu'aux doublons de saisie.
	delete: async ({ params, locals }) => {
		requireAdmin(locals)
		const id = childIdOr404(params.id)
		const db = getDb()
		await db.delete(beneficiaries).where(eq(beneficiaries.id, id))
		redirect(303, '/portal/children')
	}
}
