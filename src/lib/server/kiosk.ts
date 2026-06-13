import { createHmac, timingSafeEqual } from 'node:crypto'
import { env } from '$env/dynamic/private'

// Mode kiosque : une tablette partagée au centre ouvre une session « kiosque »
// avec un code PIN (KIOSK_PIN), sans compte. La preuve d'ouverture est un
// cookie signé (HMAC du secret better-auth) avec une expiration — pas de
// session better-auth, donc aucun accès au reste du portail.

export const KIOSK_COOKIE = 'kiosk'
export const KIOSK_COOKIE_PATH = '/portal/kiosk'
const TTL_MS = 12 * 60 * 60 * 1000 // 12 h : une journée d'activité au centre
export const KIOSK_MAX_AGE_SECONDS = TTL_MS / 1000

function secret(): string {
	// En l'absence de secret on refuse toute ouverture (voir checkKioskPin).
	return env.BETTER_AUTH_SECRET ?? ''
}

function sign(payload: string): string {
	return createHmac('sha256', secret()).update(payload).digest('base64url')
}

function safeEqual(a: string, b: string): boolean {
	const ba = Buffer.from(a)
	const bb = Buffer.from(b)
	return ba.length === bb.length && timingSafeEqual(ba, bb)
}

// Jeton = "expiration.signature(expiration)".
export function makeKioskToken(): string {
	const exp = String(Date.now() + TTL_MS)
	return `${exp}.${sign(exp)}`
}

export function isValidKioskToken(token: string | undefined): boolean {
	if (!token || !secret()) return false
	const [exp, sig] = token.split('.')
	if (!exp || !sig) return false
	if (!safeEqual(sig, sign(exp))) return false
	return Number(exp) > Date.now()
}

export function kioskPinConfigured(): boolean {
	return !!env.KIOSK_PIN && !!secret()
}

export function checkKioskPin(pin: string): boolean {
	const expected = env.KIOSK_PIN
	if (!expected || !secret()) return false
	return safeEqual(pin, expected)
}
