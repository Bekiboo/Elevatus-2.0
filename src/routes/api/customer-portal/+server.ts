import { json } from '@sveltejs/kit'
import { stripe } from '$lib/server/stripe'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ request, url }) => {
	try {
		const { sessionId } = await request.json()

		// Get the checkout session to find the customer ID
		const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId)

		if (!checkoutSession.customer) {
			return json({ error: 'No customer found' }, { status: 400 })
		}

		// Create a portal session
		const portalSession = await stripe.billingPortal.sessions.create({
			customer: checkoutSession.customer as string,
			return_url: `${url.origin}/donate`
		})

		return json({ url: portalSession.url })
	} catch (error) {
		console.error('Portal error:', error)
		return json({ error: 'Failed to create portal session' }, { status: 500 })
	}
}
