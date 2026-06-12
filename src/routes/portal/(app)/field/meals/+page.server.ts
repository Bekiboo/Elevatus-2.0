import { fail, redirect } from '@sveltejs/kit'
import { and, desc, eq, gte } from 'drizzle-orm'
import { DateTime } from 'luxon'
import { getDb, pgErrorCode } from '$lib/server/db'
import { mealDays } from '$lib/server/db/schema'
import { getActiveSchools, resolveSelectedSchool, todayInMadagascar } from '$lib/server/portal'
import { isIsoDate, isUuid, mealDaySchema, parseForm } from '$lib/portal/validation'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
	const db = getDb()
	const allSchools = await getActiveSchools(db)

	const today = todayInMadagascar()
	const selectedSchoolId = resolveSelectedSchool(allSchools, url)
	const dateParam = url.searchParams.get('date')
	const formDate = isIsoDate(dateParam) ? dateParam : today

	let days: {
		date: string
		label: string
		entry: { id: string; served: boolean; mealsCount: number | null; notes: string | null } | null
	}[] = []
	let formEntry: (typeof days)[number]['entry'] = null

	if (selectedSchoolId) {
		const since = DateTime.fromISO(today).minus({ days: 13 }).toISODate()!
		const entries = await db
			.select()
			.from(mealDays)
			.where(and(eq(mealDays.schoolId, selectedSchoolId), gte(mealDays.date, since)))
			.orderBy(desc(mealDays.date))

		days = Array.from({ length: 14 }, (_, i) => {
			const d = DateTime.fromISO(today).minus({ days: i })
			const date = d.toISODate()!
			const entry = entries.find((e) => e.date === date) ?? null
			return {
				date,
				label: d.setLocale('fr').toFormat('ccc d LLL'),
				entry: entry
					? { id: entry.id, served: entry.served, mealsCount: entry.mealsCount, notes: entry.notes }
					: null
			}
		})

		// formDate est presque toujours dans la fenêtre déjà chargée ; une seule
		// requête de plus uniquement pour une date plus ancienne.
		if (formDate >= since) {
			formEntry = days.find((d) => d.date === formDate)?.entry ?? null
		} else {
			const [older] = await db
				.select()
				.from(mealDays)
				.where(and(eq(mealDays.schoolId, selectedSchoolId), eq(mealDays.date, formDate)))
			formEntry = older
				? { id: older.id, served: older.served, mealsCount: older.mealsCount, notes: older.notes }
				: null
		}
	}

	return { schools: allSchools, selectedSchoolId, today, formDate, formEntry, days }
}

export const actions: Actions = {
	save: async ({ request, locals }) => {
		const parsed = parseForm(mealDaySchema, await request.formData(), 'save')
		if (!parsed.ok) return parsed.failure
		const { schoolId, date, served, mealsCount, notes } = parsed.data
		const db = getDb()
		const recordedBy = locals.user?.id ?? null
		try {
			await db
				.insert(mealDays)
				.values({ schoolId, date, served, mealsCount, notes, recordedBy })
				.onConflictDoUpdate({
					target: [mealDays.schoolId, mealDays.date],
					// $onUpdate ne s'applique pas aux upserts : updatedAt explicite.
					set: { served, mealsCount, notes, recordedBy, updatedAt: new Date() }
				})
		} catch (e) {
			// 23503 : école supprimée entre-temps (page restée ouverte)
			if (pgErrorCode(e) === '23503') {
				return fail(400, {
					formId: 'save',
					error: "Cette école n'existe plus — recharge la page."
				})
			}
			throw e
		}
		// On garde la date corrigée à l'écran (rattrapages en série).
		redirect(303, `/portal/field/meals?ecole=${schoolId}&date=${date}`)
	},

	delete: async ({ request }) => {
		const form = await request.formData()
		const id = String(form.get('id') ?? '')
		const schoolId = String(form.get('schoolId') ?? '')
		if (isUuid(id)) {
			const db = getDb()
			await db.delete(mealDays).where(eq(mealDays.id, id))
		}
		redirect(303, `/portal/field/meals${isUuid(schoolId) ? `?ecole=${schoolId}` : ''}`)
	}
}
