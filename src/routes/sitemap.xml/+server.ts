import { supabaseClient } from '$lib/db/supabase'
import type { RequestHandler } from './$types'

export const prerender = true

export const GET: RequestHandler = async () => {
	const baseUrl = 'https://www.elevatus-foundation.org'

	// Static pages with their priorities and change frequencies
	const staticPages = [
		{ url: '', priority: '1.0', changefreq: 'monthly' }, // homepage
		{ url: '/programs/education', priority: '0.9', changefreq: 'monthly' },
		{ url: '/programs/nutrition', priority: '0.9', changefreq: 'monthly' },
		{ url: '/programs/skills', priority: '0.9', changefreq: 'monthly' },
		{ url: '/team', priority: '0.8', changefreq: 'monthly' },
		{ url: '/blog', priority: '0.8', changefreq: 'weekly' },
		{ url: '/donate', priority: '0.9', changefreq: 'monthly' },
		{ url: '/contact', priority: '0.7', changefreq: 'yearly' }
	]

	// Fetch blog posts
	let blogPosts: Array<{ id: number; created_at: string }> = []
	try {
		const { data, error } = await supabaseClient
			.from('blog-post')
			.select('id, created_at')
			.order('created_at', { ascending: false })

		if (!error && data) {
			blogPosts = data.filter((post) => post.created_at !== null) as Array<{
				id: number
				created_at: string
			}>
		}
	} catch (err) {
		console.error('Error fetching blog posts for sitemap:', err)
	}

	// Generate sitemap XML
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${staticPages
	.map(
		(page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
	)
	.join('\n')}
${blogPosts
	.map(
		(post) => `  <url>
    <loc>${baseUrl}/blog/${post.id}</loc>
    <lastmod>${new Date(post.created_at).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
	)
	.join('\n')}
</urlset>`

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	})
}
