import { redirect } from '@sveltejs/kit'
import { getAuth } from '$lib/server/auth'
import type { Actions } from './$types'

export const actions: Actions = {
	default: async ({ request }) => {
		try {
			await getAuth().api.signOut({ headers: request.headers })
		} catch {
			// Session already gone — redirecting to login is the right outcome either way.
		}
		redirect(303, '/portal/login')
	}
}
