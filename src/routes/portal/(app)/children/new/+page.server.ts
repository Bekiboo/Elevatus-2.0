import { fail, redirect } from '@sveltejs/kit'
import { getDb } from '$lib/server/db'
import { beneficiaries } from '$lib/server/db/schema'
import { childSchema, formErrors } from '$lib/portal/validation'
import type { Actions } from './$types'

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData()
		const parsed = childSchema.safeParse(Object.fromEntries(form))
		if (!parsed.success) {
			return fail(400, { error: formErrors(parsed.error), values: Object.fromEntries(form) })
		}

		const db = getDb()
		const [child] = await db
			.insert(beneficiaries)
			.values({ ...parsed.data, createdBy: locals.user?.id ?? null })
			.returning({ id: beneficiaries.id })

		redirect(303, `/portal/children/${child.id}`)
	}
}
