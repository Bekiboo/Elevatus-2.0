import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
	schema: './src/lib/server/db/schema/index.ts',
	out: './drizzle',
	dialect: 'postgresql',
	// Session pooler (port 5432) — used by drizzle-kit studio/introspect only.
	// Migrations are applied to prod through the Supabase MCP, not drizzle-kit migrate.
	dbCredentials: { url: process.env.DATABASE_SESSION_URL ?? '' },
	verbose: true,
	strict: true
})
