import { json } from '@sveltejs/kit'
import { stripe } from '$lib/server/stripe'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ request, url }) => {
	try {
		const { amount, isRecurring } = await request.json()

		if (isRecurring) {
			// Create a subscription checkout session
			const session = await stripe.checkout.sessions.create({
				payment_method_types: ['card'],
				line_items: [
					{
						price_data: {
							currency: 'usd',
							product_data: {
								name: 'Monthly Sponsorship - Elevatus',
								description:
									'Recurring monthly donation supporting education, nutrition, and skills development for children'
							},
							unit_amount: amount,
							recurring: {
								interval: 'month'
							}
						},
						quantity: 1
					}
				],
				mode: 'subscription',
				success_url: `${url.origin}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `${url.origin}/donate/cancelled`,
				customer_email: undefined, // Let customer enter email
				billing_address_collection: 'auto'
			})

			return json({ url: session.url })
		} else {
			// Create a one-time payment checkout session
			const session = await stripe.checkout.sessions.create({
				payment_method_types: ['card'],
				line_items: [
					{
						price_data: {
							currency: 'usd',
							product_data: {
								name: 'Donation to Elevatus',
								description: 'Supporting education, nutrition, and skills development for children'
							},
							unit_amount: amount
						},
						quantity: 1
					}
				],
				mode: 'payment',
				success_url: `${url.origin}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `${url.origin}/donate/cancelled`,
				customer_email: undefined, // Let customer enter email
				billing_address_collection: 'auto'
			})

			return json({ url: session.url })
		}
	} catch (error) {
		console.error('Stripe error:', error)
		return json({ error: 'Failed to create checkout session' }, { status: 500 })
	}
}
