// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { Session, SessionUser } from '$lib/server/auth'

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: SessionUser | null
			session: Session | null
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {}
