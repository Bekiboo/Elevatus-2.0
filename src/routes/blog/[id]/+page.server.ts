import { supabaseClient } from '$lib/db/supabase'
import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'

async function getPost(id: string) {
	console.log('getPost: ', id)
	const { data, error: err } = await supabaseClient.from('blog-post').select().eq('id', id)
	console.log(data)
	// if (err === null) error(404, 'Post not found') TO FIX
	return data![0]
}

export const load = (async ({ params }) => {
	const { id } = params

	const blogPost = await getPost(id)

	return { blogPost }
}) satisfies PageServerLoad
