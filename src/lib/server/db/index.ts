import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '$env/dynamic/private'
import * as schema from './schema'

let _db: ReturnType<typeof createDb> | undefined

function createDb() {
	if (!env.DATABASE_URL) {
		throw new Error('DATABASE_URL is not set — the portal cannot reach the database')
	}
	// Transaction pooler (port 6543): no prepared statements allowed.
	const client = postgres(env.DATABASE_URL, { prepare: false })
	return drizzle(client, { schema })
}

// Lazy singleton so importing this module never crashes the public site:
// the connection is only created when a portal/auth request actually needs it.
export function getDb() {
	_db ??= createDb()
	return _db
}

export type Db = ReturnType<typeof getDb>

// drizzle wraps driver errors; the Postgres code (23505 unique violation,
// 23503 FK violation, …) lives on the cause.
export function pgErrorCode(e: unknown): string | undefined {
	if (typeof e !== 'object' || e === null) return undefined
	const cause = (e as { cause?: { code?: string } }).cause
	return cause?.code ?? (e as { code?: string }).code
}
