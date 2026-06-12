import Stripe from 'stripe'
import { env } from '$env/dynamic/private'

let _stripe: Stripe | undefined

// Lazy so importing this module never crashes the build or unrelated routes:
// the key is only required when a payment endpoint actually runs.
export function getStripe(): Stripe {
	if (!env.STRIPE_SECRET_KEY) {
		throw new Error('STRIPE_SECRET_KEY is not set')
	}
	_stripe ??= new Stripe(env.STRIPE_SECRET_KEY, {
		apiVersion: '2025-11-17.clover'
	})
	return _stripe
}
