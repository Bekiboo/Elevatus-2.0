import { fail, redirect } from '@sveltejs/kit'
import { and, asc, desc, eq, gte } from 'drizzle-orm'
import { DateTime } from 'luxon'
import { getDb } from '$lib/server/db'
import { mealDays, schools } from '$lib/server/db/schema'
import { todayInMadagascar } from '$lib/server/portal'
import { formErrors, mealDaySchema } from '$lib/portal/validation'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
	const db = getDb()
	const allSchools = await db
		.select()
		.from(schools)
		.where(eq(schools.archived, false))
		.orderBy(asc(schools.name))

	const today = todayInMadagascar()
	const selectedSchoolId =
		allSchools.find((s) => s.id === url.searchParams.get('ecole'))?.id ?? allSchools[0]?.id ?? null
	const formDate = /^\d{4}-\d{2}-\d{2}$/.test(url.searchParams.get('date') ?? '')
		? url.searchParams.get('date')!
		: today

	let days: {
		date: string
		label: string
		entry: { id: string; served: boolean; mealsCount: number | null; notes: string | null } | null
	}[] = []
	let formEntry = null

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

		const existing = await db
			.select()
			.from(mealDays)
			.where(and(eq(mealDays.schoolId, selectedSchoolId), eq(mealDays.date, formDate)))
		formEntry = existing[0] ?? null
	}

	return { schools: allSchools, selectedSchoolId, today, formDate, formEntry, days }
}

export const actions: Actions = {
	save: async ({ request, locals }) => {
		const form = await request.formData()
		const parsed = mealDaySchema.safeParse(Object.fromEntries(form))
		if (!parsed.success) {
			return fail(400, { formId: 'save', error: formErrors(parsed.error) })
		}
		const { schoolId, date, served, mealsCount, notes } = parsed.data
		const db = getDb()
		await db
			.insert(mealDays)
			.values({ schoolId, date, served, mealsCount, notes, recordedBy: locals.user?.id ?? null })
			.onConflictDoUpdate({
				target: [mealDays.schoolId, mealDays.date],
				set: { served, mealsCount, notes, recordedBy: locals.user?.id ?? null }
			})
		redirect(303, `/portal/field/meals?ecole=${schoolId}`)
	},

	delete: async ({ request }) => {
		const form = await request.formData()
		const id = String(form.get('id') ?? '')
		const schoolId = String(form.get('schoolId') ?? '')
		if (id) {
			const db = getDb()
			await db.delete(mealDays).where(eq(mealDays.id, id))
		}
		redirect(303, `/portal/field/meals${schoolId ? `?ecole=${schoolId}` : ''}`)
	}
}
