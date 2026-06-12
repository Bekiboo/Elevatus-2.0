import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { admin } from 'better-auth/plugins/admin'
import { sveltekitCookies } from 'better-auth/svelte-kit'
import { getRequestEvent } from '$app/server'
import { env } from '$env/dynamic/private'
import { getDb } from './db'
import * as schema from './db/schema'

let _auth: ReturnType<typeof createAuth> | undefined

function createAuth() {
	return betterAuth({
		secret: env.BETTER_AUTH_SECRET,
		baseURL: env.BETTER_AUTH_URL,
		database: drizzleAdapter(getDb(), { provider: 'pg', schema }),
		emailAndPassword: {
			enabled: true,
			// Staff accounts are created by admins from the portal, never self-service.
			disableSignUp: true
		},
		plugins: [
			admin({ defaultRole: 'staff', adminRoles: ['admin'] }),
			// Must stay last so it can write better-auth's cookies onto the SvelteKit event.
			sveltekitCookies(getRequestEvent)
		]
	})
}

// Lazy for the same reason as getDb(): the public site never pays for this.
export function getAuth() {
	_auth ??= createAuth()
	return _auth
}

type Auth = ReturnType<typeof getAuth>
export type SessionUser = Auth['$Infer']['Session']['user']
export type Session = Auth['$Infer']['Session']['session']
