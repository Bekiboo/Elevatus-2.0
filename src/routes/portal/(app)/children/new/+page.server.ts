import { redirect } from '@sveltejs/kit'
import { getDb } from '$lib/server/db'
import { beneficiaries } from '$lib/server/db/schema'
import { childSchema, parseForm } from '$lib/portal/validation'
import type { Actions } from './$types'

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData()
		const parsed = parseForm(childSchema, formData, 'create', { withValues: true })
		if (!parsed.ok) return parsed.failure

		const db = getDb()
		const [child] = await db
			.insert(beneficiaries)
			.values({ ...parsed.data, createdBy: locals.user?.id ?? null })
			.returning({ id: beneficiaries.id })

		redirect(303, `/portal/children/${child.id}`)
	}
}
