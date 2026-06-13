import { redirect, type Handle } from '@sveltejs/kit'
import { building } from '$app/environment'
import { svelteKitHandler } from 'better-auth/svelte-kit'
import { getAuth, type SessionUser } from '$lib/server/auth'

// Auth only ever runs for these prefixes; the public site never touches
// the database or better-auth (and keeps working if DATABASE_URL is absent).
const AUTH_API_PREFIX = '/api/auth'
const PORTAL_PREFIX = '/portal'
const KIOSK_PREFIX = '/portal/kiosk'

export const handle: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url

	event.locals.user = null
	event.locals.session = null

	if (building) return resolve(event)

	if (pathname.startsWith(AUTH_API_PREFIX)) {
		return svelteKitHandler({ event, resolve, auth: getAuth(), building })
	}

	// Le mode kiosque se garde lui-même (code PIN + cookie signé) : pas de
	// session better-auth, donc il échappe au guard du portail ci-dessous —
	// sinon il serait renvoyé vers /portal/login.
	if (pathname === KIOSK_PREFIX || pathname.startsWith(`${KIOSK_PREFIX}/`)) {
		return resolve(event)
	}

	if (pathname === PORTAL_PREFIX || pathname.startsWith(`${PORTAL_PREFIX}/`)) {
		const session = await getAuth().api.getSession({ headers: event.request.headers })
		// getSession est typé sans les champs du plugin admin (role, banned…)
		// alors que l'objet les contient bien — on réaligne le type ici, à la
		// seule frontière où l'utilisateur entre dans locals.
		event.locals.user = (session?.user as SessionUser | undefined) ?? null
		event.locals.session = session?.session ?? null

		// Guard enforced here, not in a layout load: layout guards don't run
		// for form actions, so a POST to ?/action would otherwise slip through.
		if (!event.locals.user && pathname !== `${PORTAL_PREFIX}/login`) {
			redirect(303, `${PORTAL_PREFIX}/login`)
		}

		// L'espace admin (pages ET actions) est réservé au rôle admin.
		if (pathname.startsWith(`${PORTAL_PREFIX}/admin`) && event.locals.user?.role !== 'admin') {
			redirect(303, PORTAL_PREFIX)
		}
	}

	return resolve(event)
}
