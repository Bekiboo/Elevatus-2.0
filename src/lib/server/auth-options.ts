import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { admin } from 'better-auth/plugins/admin'
import type { Db } from './db'
import type * as appSchema from './db/schema'

// Options better-auth partagées entre l'app (src/lib/server/auth.ts) et les
// scripts hors SvelteKit (scripts/seed-admin.ts) — une seule source de vérité
// pour l'adapter, les rôles et la politique de comptes. Volontairement sans
// import runtime relatif (seuls des paquets) pour rester exécutable sous Node
// nu via type-stripping : db et schema sont fournis par l'appelant.
export function buildAuthOptions(opts: {
	db: Db
	schema: typeof appSchema
	secret: string | undefined
	baseURL: string | undefined
	allowSignUp?: boolean
}) {
	return {
		secret: opts.secret,
		baseURL: opts.baseURL,
		database: drizzleAdapter(opts.db, { provider: 'pg', schema: opts.schema }),
		emailAndPassword: {
			enabled: true,
			// Les comptes staff sont créés par les admins, jamais en self-service
			// (le seed passe allowSignUp: true le temps de créer le premier admin).
			disableSignUp: !(opts.allowSignUp ?? false)
		},
		plugins: [admin({ defaultRole: 'staff', adminRoles: ['admin'] })]
	}
}
