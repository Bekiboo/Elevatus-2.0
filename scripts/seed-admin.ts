/**
 * Seeds the first portal admin account.
 * Run with: node scripts/seed-admin.ts [email] [name]
 *
 * Standalone on purpose (plain process.env, no $env/$app imports) so it runs
 * under plain Node. Signup is enabled here only — the app itself keeps
 * disableSignUp: true.
 */
import 'dotenv/config'
import crypto from 'node:crypto'
import fs from 'node:fs'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { admin } from 'better-auth/plugins/admin'
import { eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '../src/lib/server/db/schema/auth.ts'

const email = process.argv[2] ?? 'julien@ensombl.io'
const name = process.argv[3] ?? 'Julien'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql, { schema })

const existing = await db.select().from(schema.user).where(eq(schema.user.email, email))
if (existing.length > 0) {
	console.log(`Le compte ${email} existe déjà (role: ${existing[0].role}). Rien à faire.`)
	await sql.end()
	process.exit(0)
}

const auth = betterAuth({
	secret: process.env.BETTER_AUTH_SECRET,
	baseURL: process.env.BETTER_AUTH_URL,
	database: drizzleAdapter(db, { provider: 'pg', schema }),
	emailAndPassword: { enabled: true },
	plugins: [admin()]
})

const password = crypto.randomBytes(12).toString('base64url')
await auth.api.signUpEmail({ body: { name, email, password } })
await db
	.update(schema.user)
	.set({ role: 'admin', emailVerified: true })
	.where(eq(schema.user.email, email))

const credFile = 'portal-admin-credentials.txt'
fs.writeFileSync(credFile, `Portail Elevatus — http://localhost:5173/portal/login\nemail: ${email}\nmot de passe: ${password}\n`, {
	mode: 0o600
})

console.log(`Compte admin créé pour ${email}.`)
console.log(`Mot de passe écrit dans ${credFile} (gitignoré) — connecte-toi puis supprime le fichier.`)
await sql.end()
