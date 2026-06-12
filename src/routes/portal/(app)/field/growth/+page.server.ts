import { fail } from '@sveltejs/kit'
import { and, asc, desc, eq, inArray, lt } from 'drizzle-orm'
import { getDb, pgErrorCode } from '$lib/server/db'
import { beneficiaries, enrollments, growthMeasurements } from '$lib/server/db/schema'
import {
	getActiveSchools,
	getCurrentSchoolYear,
	resolveSelectedSchool,
	todayInMadagascar
} from '$lib/server/portal'
import { growthSchema, isIsoDate, parseForm } from '$lib/portal/validation'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
	const db = getDb()
	const [allSchools, currentYear] = await Promise.all([
		getActiveSchools(db),
		getCurrentSchoolYear(db)
	])

	const today = todayInMadagascar()
	const dateParam = url.searchParams.get('date')
	const measureDate = isIsoDate(dateParam) ? dateParam : today
	const selectedSchoolId = resolveSelectedSchool(allSchools, url)

	let children: {
		id: string
		fullName: string
		birthDate: string | null
		grade: string
		last: { measuredOn: string; heightCm: string; weightKg: string } | null
		todays: { heightCm: string; weightKg: string } | null
	}[] = []

	if (selectedSchoolId && currentYear) {
		const enrolled = await db
			.select({
				id: beneficiaries.id,
				fullName: beneficiaries.fullName,
				birthDate: beneficiaries.birthDate,
				grade: enrollments.grade
			})
			.from(enrollments)
			.innerJoin(beneficiaries, eq(beneficiaries.id, enrollments.beneficiaryId))
			.where(
				and(
					eq(enrollments.schoolId, selectedSchoolId),
					eq(enrollments.schoolYearId, currentYear.id),
					eq(beneficiaries.archived, false)
				)
			)
			.orderBy(asc(beneficiaries.fullName))

		const ids = enrolled.map((c) => c.id)
		// Deux requêtes bornées (2 lignes max par enfant), quel que soit
		// l'historique accumulé : la mesure du jour sélectionné, et la dernière
		// mesure STRICTEMENT ANTÉRIEURE (un rattrapage ne doit pas afficher une
		// mesure future comme référence).
		const [todaysRows, lastRows] = ids.length
			? await Promise.all([
					db
						.select()
						.from(growthMeasurements)
						.where(
							and(
								inArray(growthMeasurements.beneficiaryId, ids),
								eq(growthMeasurements.measuredOn, measureDate)
							)
						),
					db
						.selectDistinctOn([growthMeasurements.beneficiaryId])
						.from(growthMeasurements)
						.where(
							and(
								inArray(growthMeasurements.beneficiaryId, ids),
								lt(growthMeasurements.measuredOn, measureDate)
							)
						)
						.orderBy(growthMeasurements.beneficiaryId, desc(growthMeasurements.measuredOn))
				])
			: [[], []]

		children = enrolled.map((c) => {
			const todaysM = todaysRows.find((m) => m.beneficiaryId === c.id) ?? null
			const last = lastRows.find((m) => m.beneficiaryId === c.id) ?? null
			return {
				...c,
				last: last
					? { measuredOn: last.measuredOn, heightCm: last.heightCm, weightKg: last.weightKg }
					: null,
				todays: todaysM ? { heightCm: todaysM.heightCm, weightKg: todaysM.weightKg } : null
			}
		})
	}

	return {
		schools: allSchools,
		selectedSchoolId,
		measureDate,
		today,
		currentYearLabel: currentYear?.label ?? null,
		children
	}
}

export const actions: Actions = {
	save: async ({ request, locals }) => {
		const formData = await request.formData()
		const fallbackId = String(formData.get('beneficiaryId') ?? 'unknown')
		const parsed = parseForm(growthSchema, formData, `g-${fallbackId}`)
		if (!parsed.ok) return parsed.failure
		const { beneficiaryId, measuredOn, heightCm, weightKg } = parsed.data
		const db = getDb()
		const recordedBy = locals.user?.id ?? null
		try {
			await db
				.insert(growthMeasurements)
				.values({
					beneficiaryId,
					measuredOn,
					heightCm: String(heightCm),
					weightKg: String(weightKg),
					recordedBy
				})
				.onConflictDoUpdate({
					target: [growthMeasurements.beneficiaryId, growthMeasurements.measuredOn],
					set: {
						heightCm: String(heightCm),
						weightKg: String(weightKg),
						recordedBy,
						updatedAt: new Date()
					}
				})
		} catch (e) {
			if (pgErrorCode(e) === '23503') {
				return fail(400, {
					formId: `g-${beneficiaryId}`,
					error: 'Enfant introuvable — recharge la page.'
				})
			}
			throw e
		}
		return { formId: `g-${beneficiaryId}`, success: true }
	}
}
