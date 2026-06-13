import { fail } from '@sveltejs/kit'
import { and, asc, desc, eq, sql } from 'drizzle-orm'
import { getDb, pgErrorCode } from '$lib/server/db'
import { beneficiaries, schoolYears, surveyResponses } from '$lib/server/db/schema'
import { currentTerm, getCurrentSchoolYear } from '$lib/server/portal'
import { isUuid } from '$lib/portal/validation'
import { SURVEY_QUESTIONS, SURVEY_QUESTION_KEYS, isSurveyTerm } from '$lib/portal/surveys'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
	const db = getDb()
	const [allYears, currentYear] = await Promise.all([
		db.select().from(schoolYears).orderBy(desc(schoolYears.startsOn)),
		getCurrentSchoolYear(db)
	])

	const yearParam = url.searchParams.get('annee')
	const selectedYear =
		(isUuid(yearParam) ? allYears.find((y) => y.id === yearParam) : undefined) ??
		currentYear ??
		allYears[0] ??
		null

	const termParam = Number(url.searchParams.get('trim'))
	const term = isSurveyTerm(termParam) ? termParam : currentTerm(selectedYear)

	const youthRows = await db
		.select({
			id: beneficiaries.id,
			fullName: beneficiaries.fullName,
			birthDate: beneficiaries.birthDate
		})
		.from(beneficiaries)
		.where(eq(beneficiaries.archived, false))
		.orderBy(asc(beneficiaries.fullName))

	// Réponses déjà saisies pour l'année + trimestre sélectionnés.
	const byBeneficiary = new Map<string, Record<string, number>>()
	if (selectedYear) {
		const responses = await db
			.select({
				beneficiaryId: surveyResponses.beneficiaryId,
				questionKey: surveyResponses.questionKey,
				score: surveyResponses.score
			})
			.from(surveyResponses)
			.where(and(eq(surveyResponses.schoolYearId, selectedYear.id), eq(surveyResponses.term, term)))
		for (const r of responses) {
			const scores = byBeneficiary.get(r.beneficiaryId) ?? {}
			scores[r.questionKey] = r.score
			byBeneficiary.set(r.beneficiaryId, scores)
		}
	}

	const youth = youthRows.map((y) => ({ ...y, scores: byBeneficiary.get(y.id) ?? {} }))
	const doneCount = youth.filter((y) =>
		SURVEY_QUESTION_KEYS.every((k) => y.scores[k] != null)
	).length

	return {
		years: allYears.map((y) => ({ id: y.id, label: y.label })),
		selectedYearId: selectedYear?.id ?? null,
		selectedYearLabel: selectedYear?.label ?? null,
		term,
		youth,
		doneCount
	}
}

export const actions: Actions = {
	save: async ({ request, locals }) => {
		const form = await request.formData()
		const beneficiaryId = String(form.get('beneficiaryId') ?? '')
		const schoolYearId = String(form.get('schoolYearId') ?? '')
		const term = Number(form.get('term'))

		if (!isUuid(beneficiaryId) || !isUuid(schoolYearId) || !isSurveyTerm(term)) {
			return fail(400, { formId: 'list', error: 'Requête invalide — recharge la page.' })
		}

		const recordedBy = locals.user?.id ?? null
		const rows = []
		for (const q of SURVEY_QUESTIONS) {
			const score = Number(form.get(`score-${q.key}`))
			if (!Number.isInteger(score) || score < 1 || score > 5) {
				return fail(400, {
					formId: `s-${beneficiaryId}`,
					error: 'Merci de répondre aux trois questions.'
				})
			}
			rows.push({
				beneficiaryId,
				schoolYearId,
				term,
				questionKey: q.key,
				score,
				viaKiosk: false,
				recordedBy
			})
		}

		const db = getDb()
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
				return fail(400, {
					formId: `s-${beneficiaryId}`,
					error: 'Jeune introuvable — recharge la page.'
				})
			}
			throw e
		}
		return { formId: `s-${beneficiaryId}`, success: true }
	}
}
