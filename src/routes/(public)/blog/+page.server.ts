import type { PageServerLoad } from './$types'
import type { Database } from '$lib/db/database.types'
import { supabaseClient } from '$lib/db/supabase'

async function getPosts(): Promise<Database['public']['Tables']['blog-post']['Row'][]> {
	const { data, error } = await supabaseClient.from('blog-post').select()
	if (error) {
		console.error('getPosts: ', error)
		return [] // Return an empty array in case of an error
	}

	data.sort((a, b) => b.id - a.id)
	return data
}

export const load = (async () => {
	const posts: Database['public']['Tables']['blog-post']['Row'][] = []

	try {
		const res = await getPosts()
		posts.push(...res)
	} catch (err) {
		console.log(err)
	}

	return { posts }
}) satisfies PageServerLoad
