import { fail, redirect } from '@sveltejs/kit'
import { asc, eq, sql } from 'drizzle-orm'
import { dev } from '$app/environment'
import { getDb, pgErrorCode } from '$lib/server/db'
import { beneficiaries, surveyResponses } from '$lib/server/db/schema'
import { currentTerm, getCurrentSchoolYear } from '$lib/server/portal'
import {
	KIOSK_COOKIE,
	KIOSK_COOKIE_PATH,
	KIOSK_MAX_AGE_SECONDS,
	checkKioskPin,
	isValidKioskToken,
	kioskPinConfigured,
	makeKioskToken
} from '$lib/server/kiosk'
import { isUuid } from '$lib/portal/validation'
import { SURVEY_QUESTIONS, termLabel } from '$lib/portal/surveys'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ cookies }) => {
	if (!isValidKioskToken(cookies.get(KIOSK_COOKIE))) {
		return { unlocked: false as const, pinConfigured: kioskPinConfigured() }
	}

	const db = getDb()
	const year = await getCurrentSchoolYear(db)
	const youth = await db
		.select({ id: beneficiaries.id, fullName: beneficiaries.fullName })
		.from(beneficiaries)
		.where(eq(beneficiaries.archived, false))
		.orderBy(asc(beneficiaries.fullName))

	const term = currentTerm(year)
	return {
		unlocked: true as const,
		pinConfigured: true,
		youth,
		yearLabel: year?.label ?? null,
		term,
		termLabel: termLabel(term)
	}
}

export const actions: Actions = {
	// L'agent ouvre la session kiosque avec le code PIN.
	unlock: async ({ request, cookies }) => {
		const pin = String((await request.formData()).get('pin') ?? '')
		if (!kioskPinConfigured()) {
			return fail(400, { stage: 'pin', error: "Le mode kiosque n'est pas configuré." })
		}
		if (!checkKioskPin(pin)) {
			return fail(400, { stage: 'pin', error: 'Code incorrect.' })
		}
		cookies.set(KIOSK_COOKIE, makeKioskToken(), {
			path: KIOSK_COOKIE_PATH,
			httpOnly: true,
			sameSite: 'lax',
			secure: !dev,
			maxAge: KIOSK_MAX_AGE_SECONDS
		})
		redirect(303, '/portal/kiosk')
	},

	// Fermer le kiosque (réservé à l'agent) — réclame le PIN à nouveau.
	lock: async ({ cookies }) => {
		cookies.delete(KIOSK_COOKIE, { path: KIOSK_COOKIE_PATH })
		redirect(303, '/portal/kiosk')
	},

	// Le jeune valide son auto-évaluation. L'année et le trimestre sont
	// recalculés côté serveur (jamais le client), `via_kiosk = true`,
	// aucune traçabilité d'agent (recorded_by null).
	submit: async ({ request, cookies }) => {
		if (!isValidKioskToken(cookies.get(KIOSK_COOKIE))) {
			return fail(403, {
				stage: 'survey',
				error: 'Session kiosque expirée — préviens un encadrant.'
			})
		}
		const form = await request.formData()
		const beneficiaryId = String(form.get('beneficiaryId') ?? '')
		if (!isUuid(beneficiaryId)) {
			return fail(400, { stage: 'survey', error: 'Choisis ton nom.' })
		}

		const db = getDb()
		const year = await getCurrentSchoolYear(db)
		if (!year) {
			return fail(400, { stage: 'survey', error: 'Aucune année scolaire définie.' })
		}
		const term = currentTerm(year)

		const rows = []
		for (const q of SURVEY_QUESTIONS) {
			const score = Number(form.get(`score-${q.key}`))
			if (!Number.isInteger(score) || score < 1 || score > 5) {
				return fail(400, { stage: 'survey', error: 'Réponds aux trois questions.' })
			}
			rows.push({
				beneficiaryId,
				schoolYearId: year.id,
				term,
				questionKey: q.key,
				score,
				viaKiosk: true,
				recordedBy: null
			})
		}

		try {
			await db
				.insert(surveyResponses)
				.values(rows)
				.onConflictDoUpdate({
					target: [
						surveyResponses.beneficiaryId,
						surveyResponses.schoolYearId,
						surveyResponses.term,
						surveyResponses.questionKey
					],
					set: {
						score: sql`excluded.score`,
						viaKiosk: sql`excluded.via_kiosk`,
						recordedBy: sql`excluded.recorded_by`,
						updatedAt: new Date()
					}
				})
		} catch (e) {
			if (pgErrorCode(e) === '23503') {
				return fail(400, { stage: 'survey', error: 'Profil introuvable — préviens un encadrant.' })
			}
			throw e
		}
		return { stage: 'survey', saved: true }
	}
}
