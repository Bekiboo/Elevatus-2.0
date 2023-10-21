import { supabaseClient } from '$lib/db/supabase'
import type { PageServerLoad } from './$types'

async function getPost(id: string) {
	const { data, error } = await supabaseClient.from('blog-post').select().eq('id', id)
	if (error) return console.error('getPost: ', error)
	return data[0]
}

export const load = (async ({ params }) => {
	const { id } = params

	const blogPost = await getPost(id)

	return { blogPost }
}) satisfies PageServerLoad
