// import type { Database } from './database.types'
// import { supabaseClient } from './supabase'

// export async function getPost(id: number) {
// 	const { data, error } = await supabaseClient.from('blog-post').select().eq('id', id)
// 	if (error) return console.error('getPost: ', error)
// 	return data[0]
// }

// export async function createPost(post: Database['public']['Tables']['blog-post']['Insert']) {
//   const { data, error } = await supabaseClient.from('blog-post').insert(post)
//   if (error) return console.error('createPost: ', error)
//   return data
// }

// export async function updatePost(id, post) {
//   const { data, error } = await supabaseClient
//     .from('blog-post')
//     .update(post)
//     .eq('id', id)
//   if (error) return console.error('updatePost: ', error)
//   return data
// }

// export async function deletePost(id) {
// const { error } = await supabaseClient
//   .from('blog-post')
//   .delete()
//   .match({ id })
// if (error) {
//   return console.error('deletePost: ', error)
// } else {
//   blogPosts.update((blogPosts) =>
//     blogPosts.filter((blogPost) => blogPost.id !== id)
//   )
// }
// }
