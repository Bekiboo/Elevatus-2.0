import { randomBytes } from 'node:crypto'
import { fail } from '@sveltejs/kit'
import { APIError } from 'better-auth/api'
import { getAuth } from '$lib/server/auth'
import { requireAdmin } from '$lib/server/portal'
import { createUserSchema, parseForm } from '$lib/portal/validation'
import type { Actions, PageServerLoad } from './$types'

// Gestion des comptes de l'équipe (espace admin, en anglais). Tout passe par
// le plugin admin de better-auth — on lui transmet les en-têtes de la requête
// pour qu'il vérifie que l'appelant est bien admin ; `requireAdmin` double la
// garde côté portail. Les comptes ne sont jamais créés en self-service.

// Mot de passe initial : généré, jamais saisi — affiché une seule fois pour
// que l'admin le transmette (pas d'envoi d'email configuré).
function makeTempPassword(): string {
	return randomBytes(9).toString('base64url') // ~12 caractères url-safe
}

// Les IDs better-auth sont des chaînes nanoid, pas des UUID.
function formUserId(form: FormData): string {
	return String(form.get('userId') ?? '').trim()
}

// Traduit une erreur du plugin (email déjà pris, etc.) en message affichable.
function authError(e: unknown, fallback: string): string {
	return e instanceof APIError ? e.message : fallback
}

export const load: PageServerLoad = async ({ request, locals }) => {
	requireAdmin(locals)
	const res = await getAuth().api.listUsers({
		query: { limit: 200, sortBy: 'createdAt', sortDirection: 'desc' },
		headers: request.headers
	})

	const users = res.users.map((u) => ({
		id: u.id,
		name: u.name,
		email: u.email,
		role: u.role ?? 'staff',
		banned: u.banned ?? false,
		createdAt: u.createdAt instanceof Date ? u.createdAt.toISOString() : String(u.createdAt)
	}))

	return { users, currentUserId: locals.user?.id ?? null }
}

export const actions: Actions = {
	// Créer un compte : génère le mot de passe, le renvoie pour affichage unique.
	create: async ({ request, locals }) => {
		requireAdmin(locals)
		const parsed = parseForm(createUserSchema, await request.formData(), 'create', {
			withValues: true
		})
		if (!parsed.ok) return parsed.failure

		const password = makeTempPassword()
		try {
			await getAuth().api.createUser({
				body: {
					name: parsed.data.name,
					email: parsed.data.email,
					password,
					// Le plugin type le rôle sur ses rôles par défaut ('user' | 'admin'),
					// mais le nôtre par défaut est 'staff' (texte libre stocké tel quel) :
					// on force le type au point d'appel.
					role: parsed.data.role as 'admin'
				},
				headers: request.headers
			})
		} catch (e) {
			return fail(400, {
				formId: 'create',
				error: authError(e, 'Could not create the account.'),
				values: { name: parsed.data.name, email: parsed.data.email, role: parsed.data.role }
			})
		}

		return {
			formId: 'create',
			success: true,
			tempPassword: password,
			createdEmail: parsed.data.email
		}
	},

	setRole: async ({ request, locals }) => {
		requireAdmin(locals)
		const form = await request.formData()
		const userId = formUserId(form)
		const role = String(form.get('role') ?? '')
		if (!userId || (role !== 'staff' && role !== 'admin')) {
			return fail(400, { formId: 'list', error: 'Invalid request.' })
		}
		if (userId === locals.user?.id) {
			return fail(400, { formId: `row-${userId}`, error: "You can't change your own role." })
		}
		try {
			// Rôle texte libre côté base — voir la note dans l'action `create`.
			await getAuth().api.setRole({ body: { userId, role: role as 'admin' }, headers: request.headers })
		} catch (e) {
			return fail(400, { formId: `row-${userId}`, error: authError(e, 'Could not change the role.') })
		}
		return { formId: `row-${userId}`, success: true }
	},

	// Désactiver un accès (sans supprimer le compte ni ses données — l'équivalent
	// de l'archivage côté portail). Le ban révoque aussi les sessions actives.
	ban: async ({ request, locals }) => {
		requireAdmin(locals)
		const form = await request.formData()
		const userId = formUserId(form)
		if (!userId) return fail(400, { formId: 'list', error: 'Invalid request.' })
		if (userId === locals.user?.id) {
			return fail(400, { formId: `row-${userId}`, error: "You can't disable your own account." })
		}
		try {
			await getAuth().api.banUser({ body: { userId }, headers: request.headers })
		} catch (e) {
			return fail(400, { formId: `row-${userId}`, error: authError(e, 'Could not disable the account.') })
		}
		return { formId: `row-${userId}`, success: true }
	},

	unban: async ({ request, locals }) => {
		requireAdmin(locals)
		const form = await request.formData()
		const userId = formUserId(form)
		if (!userId) return fail(400, { formId: 'list', error: 'Invalid request.' })
		try {
			await getAuth().api.unbanUser({ body: { userId }, headers: request.headers })
		} catch (e) {
			return fail(400, { formId: `row-${userId}`, error: authError(e, 'Could not re-enable the account.') })
		}
		return { formId: `row-${userId}`, success: true }
	},

	// Réinitialise le mot de passe (généré, affiché une fois) et déconnecte
	// les sessions existantes pour forcer la reconnexion.
	resetPassword: async ({ request, locals }) => {
		requireAdmin(locals)
		const form = await request.formData()
		const userId = formUserId(form)
		if (!userId) return fail(400, { formId: 'list', error: 'Invalid request.' })
		const password = makeTempPassword()
		try {
			await getAuth().api.setUserPassword({
				body: { userId, newPassword: password },
				headers: request.headers
			})
			await getAuth().api.revokeUserSessions({ body: { userId }, headers: request.headers })
		} catch (e) {
			return fail(400, { formId: `row-${userId}`, error: authError(e, 'Could not reset the password.') })
		}
		return { formId: `row-${userId}`, success: true, tempPassword: password, resetUserId: userId }
	},

	// Suppression définitive — pour un compte créé par erreur. La désactivation
	// reste le geste normal pour retirer un accès.
	remove: async ({ request, locals }) => {
		requireAdmin(locals)
		const form = await request.formData()
		const userId = formUserId(form)
		if (!userId) return fail(400, { formId: 'list', error: 'Invalid request.' })
		if (userId === locals.user?.id) {
			return fail(400, { formId: `row-${userId}`, error: "You can't delete your own account." })
		}
		try {
			await getAuth().api.removeUser({ body: { userId }, headers: request.headers })
		} catch (e) {
			return fail(400, { formId: `row-${userId}`, error: authError(e, 'Could not delete the account.') })
		}
		return { formId: 'list', success: true }
	}
}
