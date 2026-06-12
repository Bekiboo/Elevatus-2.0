import { json } from '@sveltejs/kit'
import { getStripe } from '$lib/server/stripe'
import { Resend } from 'resend'
import { env } from '$env/dynamic/private'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ request, url }) => {
	try {
		if (!env.RESEND_API_KEY) {
			return json({ error: 'Email service is not configured' }, { status: 503 })
		}
		const resend = new Resend(env.RESEND_API_KEY)
		const stripe = getStripe()

		const { email } = await request.json()

		if (!email) {
			return json({ error: 'Email is required' }, { status: 400 })
		}

		// Search for customers with this email
		const customers = await stripe.customers.list({
			email: email,
			limit: 1
		})

		if (customers.data.length === 0) {
			return json({ error: 'No subscription found for this email address' }, { status: 404 })
		}

		const customer = customers.data[0]

		// Create a portal session
		const portalSession = await stripe.billingPortal.sessions.create({
			customer: customer.id,
			return_url: `${url.origin}/donate`
		})

		// Generate a secure token (expires in 1 hour)
		const token = Buffer.from(
			JSON.stringify({
				url: portalSession.url,
				exp: Date.now() + 60 * 60 * 1000 // 1 hour
			})
		).toString('base64')

		const magicLink = `${url.origin}/manage-subscription/verify?token=${encodeURIComponent(token)}`

		// Send email with magic link using Resend
		await resend.emails.send({
			from: 'Elevatus Foundation <correspondence.elevatus@gmail.com>',
			to: email,
			subject: 'Manage Your Subscription - Elevatus Foundation',
			html: `
				<!DOCTYPE html>
				<html>
				<head>
					<style>
						body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
						.container { max-width: 600px; margin: 0 auto; padding: 20px; }
						.button { 
							display: inline-block; 
							padding: 15px 30px; 
							background-color: #FF6B35; 
							color: white; 
							text-decoration: none; 
							border-radius: 5px; 
							font-weight: bold;
							margin: 20px 0;
						}
						.footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
					</style>
				</head>
				<body>
					<div class="container">
						<h2>Manage Your Subscription</h2>
						<p>Hello,</p>
						<p>You requested to manage your subscription with Elevatus Foundation. Click the button below to access your customer portal:</p>
						<a href="${magicLink}" class="button">Manage Subscription</a>
						<p>This link will expire in 1 hour for security reasons.</p>
						<p>In the customer portal, you can:</p>
						<ul>
							<li>View your subscription details</li>
							<li>Update your payment method</li>
							<li>Download invoices</li>
							<li>Cancel your subscription if needed</li>
						</ul>
						<p>If you didn't request this, you can safely ignore this email.</p>
						<p>Thank you for your support!</p>
						<p><strong>The Elevatus Team</strong></p>
						<div class="footer">
							<p>Elevatus Foundation | Supporting children in Madagascar</p>
							<p>If the button doesn't work, copy and paste this link: ${magicLink}</p>
						</div>
					</div>
				</body>
				</html>
			`
		})

		return json({ success: true, message: 'Check your email for the magic link!' })
	} catch (error) {
		console.error('Portal error:', error)
		return json({ error: 'Failed to send email. Please try again.' }, { status: 500 })
	}
}
