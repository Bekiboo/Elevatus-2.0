import { betterAuth } from 'better-auth'
import type { UserWithRole } from 'better-auth/plugins/admin'
import { sveltekitCookies } from 'better-auth/svelte-kit'
import { getRequestEvent } from '$app/server'
import { env } from '$env/dynamic/private'
import { getDb } from './db'
import * as schema from './db/schema'
import { buildAuthOptions } from './auth-options'

let _auth: ReturnType<typeof createAuth> | undefined

function createAuth() {
	const base = buildAuthOptions({
		db: getDb(),
		schema,
		secret: env.BETTER_AUTH_SECRET,
		baseURL: env.BETTER_AUTH_URL
	})
	return betterAuth({
		...base,
		// sveltekitCookies doit rester le DERNIER plugin (il écrit les cookies
		// better-auth sur l'event SvelteKit).
		plugins: [...base.plugins, sveltekitCookies(getRequestEvent)]
	})
}

// Lazy pour la même raison que getDb() : le site public ne paie jamais ça.
export function getAuth() {
	_auth ??= createAuth()
	return _auth
}

type Auth = ReturnType<typeof getAuth>
// L'inférence $Infer perd les champs du plugin admin (plugins recomposés via
// spread) : on réinjecte le type UserWithRole du plugin (role, banned…).
export type SessionUser = Auth['$Infer']['Session']['user'] & UserWithRole
export type Session = Auth['$Infer']['Session']['session']
