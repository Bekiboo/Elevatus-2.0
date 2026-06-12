import { fail } from '@sveltejs/kit'
import { and, asc, desc, eq, inArray } from 'drizzle-orm'
import { getDb, pgErrorCode } from '$lib/server/db'
import { beneficiaries, enrollments, growthMeasurements, schools } from '$lib/server/db/schema'
import { getCurrentSchoolYear, todayInMadagascar } from '$lib/server/portal'
import { formErrors, growthSchema } from '$lib/portal/validation'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
	const db = getDb()
	const allSchools = await db
		.select()
		.from(schools)
		.where(eq(schools.archived, false))
		.orderBy(asc(schools.name))

	const today = todayInMadagascar()
	const measureDate = /^\d{4}-\d{2}-\d{2}$/.test(url.searchParams.get('date') ?? '')
		? url.searchParams.get('date')!
		: today
	const selectedSchoolId =
		allSchools.find((s) => s.id === url.searchParams.get('ecole'))?.id ?? allSchools[0]?.id ?? null

	const currentYear = await getCurrentSchoolYear(db)

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
		const measurements = ids.length
			? await db
					.select()
					.from(growthMeasurements)
					.where(inArray(growthMeasurements.beneficiaryId, ids))
					.orderBy(desc(growthMeasurements.measuredOn))
			: []

		children = enrolled.map((c) => {
			const own = measurements.filter((m) => m.beneficiaryId === c.id)
			const todaysM = own.find((m) => m.measuredOn === measureDate) ?? null
			const last = own.find((m) => m.measuredOn !== measureDate) ?? null
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
		const form = await request.formData()
		const parsed = growthSchema.safeParse(Object.fromEntries(form))
		if (!parsed.success) {
			return fail(400, {
				formId: `g-${form.get('beneficiaryId')}`,
				error: formErrors(parsed.error)
			})
		}
		const { beneficiaryId, measuredOn, heightCm, weightKg } = parsed.data
		const db = getDb()
		try {
			await db
				.insert(growthMeasurements)
				.values({
					beneficiaryId,
					measuredOn,
					heightCm: String(heightCm),
					weightKg: String(weightKg),
					recordedBy: locals.user?.id ?? null
				})
				.onConflictDoUpdate({
					target: [growthMeasurements.beneficiaryId, growthMeasurements.measuredOn],
					set: {
						heightCm: String(heightCm),
						weightKg: String(weightKg),
						recordedBy: locals.user?.id ?? null
					}
				})
		} catch (e) {
			if (pgErrorCode(e) === '23503') {
				return fail(400, { formId: `g-${beneficiaryId}`, error: 'Enfant introuvable — recharge la page.' })
			}
			throw e
		}
		return { formId: `g-${beneficiaryId}`, success: true }
	}
}
