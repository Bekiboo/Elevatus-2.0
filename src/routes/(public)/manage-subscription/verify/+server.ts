import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ url }) => {
	try {
		const token = url.searchParams.get('token')

		if (!token) {
			return json({ error: 'Invalid link. Please request a new one.' }, { status: 400 })
		}

		// Decode and validate token
		const decoded = JSON.parse(Buffer.from(decodeURIComponent(token), 'base64').toString())

		// Check if expired
		if (Date.now() > decoded.exp) {
			return json(
				{ error: 'This link has expired. Please request a new one.', expired: true },
				{ status: 400 }
			)
		}

		// Return the portal URL
		return json({ url: decoded.url })
	} catch (error) {
		console.error('Verification error:', error)
		return json({ error: 'Invalid or corrupted link. Please request a new one.' }, { status: 400 })
	}
}
