import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

export const supabaseClient = createClient<Database>(
	import.meta.env.VITE_PUBLIC_SUPABASE_URL,
	import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY
)
