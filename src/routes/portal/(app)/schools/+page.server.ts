import { fail } from '@sveltejs/kit'
import { asc, count, eq } from 'drizzle-orm'
import { getDb, pgErrorCode } from '$lib/server/db'
import { enrollments, schools } from '$lib/server/db/schema'
import { formErrors, schoolSchema } from '$lib/portal/validation'
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
		const form = await request.formData()
		const parsed = schoolSchema.safeParse(Object.fromEntries(form))
		if (!parsed.success) {
			return fail(400, { formId: 'create', error: formErrors(parsed.error) })
		}
		const db = getDb()
		await db.insert(schools).values(parsed.data)
		return { formId: 'create', success: true }
	},

	update: async ({ request }) => {
		const form = await request.formData()
		const id = String(form.get('id') ?? '')
		const parsed = schoolSchema.safeParse(Object.fromEntries(form))
		if (!id || !parsed.success) {
			return fail(400, {
				formId: `row-${id}`,
				error: parsed.success ? 'École invalide.' : formErrors(parsed.error)
			})
		}
		const db = getDb()
		await db.update(schools).set(parsed.data).where(eq(schools.id, id))
		return { formId: `row-${id}`, success: true }
	},

	delete: async ({ request }) => {
		const form = await request.formData()
		const id = String(form.get('id') ?? '')
		if (!id) return fail(400, { formId: 'list', error: 'École invalide.' })
		const db = getDb()
		try {
			await db.delete(schools).where(eq(schools.id, id))
		} catch (e) {
			if (pgErrorCode(e) === '23503') {
				return fail(400, {
					formId: `row-${id}`,
					error: 'Des inscriptions référencent cette école — impossible de la supprimer.'
				})
			}
			throw e
		}
		return { formId: 'list', success: true }
	}
}
