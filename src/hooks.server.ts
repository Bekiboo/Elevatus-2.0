import { redirect, type Handle } from '@sveltejs/kit'
import { building } from '$app/environment'
import { svelteKitHandler } from 'better-auth/svelte-kit'
import { getAuth } from '$lib/server/auth'

// Auth only ever runs for these prefixes; the public site never touches
// the database or better-auth (and keeps working if DATABASE_URL is absent).
const AUTH_API_PREFIX = '/api/auth'
const PORTAL_PREFIX = '/portal'

export const handle: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url

	event.locals.user = null
	event.locals.session = null

	if (building) return resolve(event)

	if (pathname.startsWith(AUTH_API_PREFIX)) {
		return svelteKitHandler({ event, resolve, auth: getAuth(), building })
	}

	if (pathname === PORTAL_PREFIX || pathname.startsWith(`${PORTAL_PREFIX}/`)) {
		const session = await getAuth().api.getSession({ headers: event.request.headers })
		event.locals.user = session?.user ?? null
		event.locals.session = session?.session ?? null

		// Guard enforced here, not in a layout load: layout guards don't run
		// for form actions, so a POST to ?/action would otherwise slip through.
		if (!event.locals.user && pathname !== `${PORTAL_PREFIX}/login`) {
			redirect(303, `${PORTAL_PREFIX}/login`)
		}
	}

	return resolve(event)
}
