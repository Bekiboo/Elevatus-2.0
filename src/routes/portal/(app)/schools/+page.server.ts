import { fail } from '@sveltejs/kit'
import { asc, count, eq } from 'drizzle-orm'
import { getDb, pgConstraint, pgErrorCode } from '$lib/server/db'
import { enrollments, schools } from '$lib/server/db/schema'
import { requireAdmin } from '$lib/server/portal'
import { isUuid, parseForm, schoolSchema } from '$lib/portal/validation'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const db = getDb()
	const rows = await db
		.select({
			id: schools.id,
			name: schools.name,
			locality: schools.locality,
			notes: schools.notes,
			enrollmentCount: count(enrollments.id)
		})
		.from(schools)
		.leftJoin(enrollments, eq(enrollments.schoolId, schools.id))
		.where(eq(schools.archived, false))
		.groupBy(schools.id)
		.orderBy(asc(schools.name))

	return { schools: rows }
}

export const actions: Actions = {
	create: async ({ request }) => {
		const parsed = parseForm(schoolSchema, await request.formData(), 'create')
		if (!parsed.ok) return parsed.failure
		const db = getDb()
		await db.insert(schools).values(parsed.data)
		return { formId: 'create', success: true }
	},

	update: async ({ request }) => {
		const form = await request.formData()
		const id = String(form.get('id') ?? '')
		if (!isUuid(id)) return fail(400, { formId: 'list', error: 'École invalide.' })
		const parsed = parseForm(schoolSchema, form, `row-${id}`)
		if (!parsed.ok) return parsed.failure
		const db = getDb()
		await db.update(schools).set(parsed.data).where(eq(schools.id, id))
		return { formId: `row-${id}`, success: true }
	},

	delete: async ({ request, locals }) => {
		requireAdmin(locals)
		const form = await request.formData()
		const id = String(form.get('id') ?? '')
		if (!isUuid(id)) return fail(400, { formId: 'list', error: 'École invalide.' })
		const db = getDb()
		try {
			await db.delete(schools).where(eq(schools.id, id))
		} catch (e) {
			if (pgErrorCode(e) === '23503') {
				const blocker = pgConstraint(e)?.startsWith('meal_days')
					? 'des repas enregistrés référencent'
					: 'des inscriptions référencent'
				return fail(400, {
					formId: `row-${id}`,
					error: `Impossible de supprimer : ${blocker} cette école.`
				})
			}
			throw e
		}
		return { formId: 'list', success: true }
	}
}
