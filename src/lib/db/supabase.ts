import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

let _client: ReturnType<typeof createClient<Database>> | undefined

// Lazy so the module can be imported (including during prerendering — the
// sitemap builds at deploy time) without the env vars being present.
export function getSupabaseClient() {
	const url = import.meta.env.VITE_PUBLIC_SUPABASE_URL
	const key = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY
	if (!url || !key) {
		throw new Error('VITE_PUBLIC_SUPABASE_URL / VITE_PUBLIC_SUPABASE_ANON_KEY are not set')
	}
	_client ??= createClient<Database>(url, key)
	return _client
}
