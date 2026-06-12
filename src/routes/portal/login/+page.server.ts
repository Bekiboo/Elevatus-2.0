import { fail, redirect } from '@sveltejs/kit'
import { APIError } from 'better-auth/api'
import { getAuth } from '$lib/server/auth'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) redirect(303, '/portal')
}

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData()
		const email = String(form.get('email') ?? '').trim()
		const password = String(form.get('password') ?? '')

		if (!email || !password) {
			return fail(400, { email, error: 'Renseigne ton email et ton mot de passe.' })
		}

		try {
			await getAuth().api.signInEmail({
				body: { email, password },
				headers: request.headers
			})
		} catch (e) {
			if (e instanceof APIError) {
				return fail(401, { email, error: 'Email ou mot de passe incorrect.' })
			}
			throw e
		}

		redirect(303, '/portal')
	}
}
