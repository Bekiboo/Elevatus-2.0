import { DateTime } from 'luxon'
import { asc, count, desc, eq, gte, sql } from 'drizzle-orm'
import { getDb } from '$lib/server/db'
import {
	beneficiaries,
	courseAttendance,
	courses,
	enrollments,
	growthMeasurements,
	mealDays,
	schools,
	schoolYears
} from '$lib/server/db/schema'
import { getCurrentSchoolYear, todayInMadagascar } from '$lib/server/portal'
import { getStripe } from '$lib/server/stripe'
import type { PageServerLoad } from './$types'

// Le dashboard des admins regarde loin : agrégats par année scolaire,
// fenêtres de 90 jours / 6 mois, et les dons Stripe (lecture directe de
// l'API — l'historisation par webhooks viendra plus tard).

type MoneyByCurrency = Record<string, number> // centimes par devise

export type StripeSummary =
	| {
			ok: true
			thisMonth: MoneyByCurrency
			thisYear: MoneyByCurrency
			paymentsThisYear: number
			activeSubscriptions: number
			monthlyRecurring: MoneyByCurrency
			recent: { date: string; donor: string; amount: number; currency: string }[]
	  }
	| { ok: false }

async function loadStripeSummary(): Promise<StripeSummary> {
	try {
		const stripe = getStripe()
		const now = DateTime.utc()
		const startOfYear = Math.floor(now.startOf('year').toSeconds())
		const startOfMonth = Math.floor(now.startOf('month').toSeconds())

		const thisYear: MoneyByCurrency = {}
		const thisMonth: MoneyByCurrency = {}
		const recent: { date: string; donor: string; amount: number; currency: string }[] = []
		let paymentsThisYear = 0

		// Volume d'une petite ONG : on borne quand même la pagination.
		let scanned = 0
		for await (const charge of stripe.charges.list({
			limit: 100,
			created: { gte: startOfYear }
		})) {
			if (++scanned > 1000) break
			if (!charge.paid || charge.status !== 'succeeded') continue
			const net = charge.amount - charge.amount_refunded
			if (net <= 0) continue

			paymentsThisYear += 1
			thisYear[charge.currency] = (thisYear[charge.currency] ?? 0) + net
			if (charge.created >= startOfMonth) {
				thisMonth[charge.currency] = (thisMonth[charge.currency] ?? 0) + net
			}
			if (recent.length < 8) {
				recent.push({
					date: DateTime.fromSeconds(charge.created).toISODate()!,
					donor: charge.billing_details?.name ?? charge.billing_details?.email ?? '—',
					amount: net,
					currency: charge.currency
				})
			}
		}

		// Abonnements actifs → équivalent mensuel (les dons récurrents).
		const monthlyRecurring: MoneyByCurrency = {}
		let activeSubscriptions = 0
		const subs = await stripe.subscriptions.list({ status: 'active', limit: 100 })
		for (const sub of subs.data) {
			activeSubscriptions += 1
			for (const item of sub.items.data) {
				const price = item.price
				if (!price?.unit_amount || !price.recurring) continue
				const perPeriod = price.unit_amount * (item.quantity ?? 1)
				const months =
					price.recurring.interval === 'month'
						? price.recurring.interval_count
						: price.recurring.interval === 'year'
							? price.recurring.interval_count * 12
							: null
				if (!months) continue
				monthlyRecurring[price.currency] =
					(monthlyRecurring[price.currency] ?? 0) + Math.round(perPeriod / months)
			}
		}

		return {
			ok: true,
			thisMonth,
			thisYear,
			paymentsThisYear,
			activeSubscriptions,
			monthlyRecurring,
			recent
		}
	} catch {
		// Clé absente ou API indisponible : le dashboard vit sans Stripe.
		return { ok: false }
	}
}

export const load: PageServerLoad = async () => {
	const db = getDb()
	const today = todayInMadagascar()
	const from90 = DateTime.fromISO(today).minus({ days: 90 }).toISODate()!
	const from6Months = DateTime.fromISO(today).minus({ months: 5 }).toFormat('yyyy-MM')

	const [
		currentYear,
		[childCount],
		[schoolCount],
		educationByYear,
		[meals90],
		[growth90],
		attendanceByMonth,
		stripe
	] = await Promise.all([
		getCurrentSchoolYear(db),
		db.select({ n: count() }).from(beneficiaries).where(eq(beneficiaries.archived, false)),
		db.select({ n: count() }).from(schools).where(eq(schools.archived, false)),
		// Indicateurs 1.1–1.2 : par année scolaire, inscrits / parrainés /
		// années validées / passages (les % se calculent sur les issues saisies).
		db
			.select({
				label: schoolYears.label,
				enrolled: count(),
				sponsored: sql`count(*) filter (where ${enrollments.isSponsored})`.mapWith(Number),
				outcomesRecorded: sql`count(${enrollments.completedYear})`.mapWith(Number),
				completed: sql`count(*) filter (where ${enrollments.completedYear})`.mapWith(Number),
				promotionsRecorded: sql`count(${enrollments.promoted})`.mapWith(Number),
				promoted: sql`count(*) filter (where ${enrollments.promoted})`.mapWith(Number)
			})
			.from(enrollments)
			.innerJoin(schoolYears, eq(enrollments.schoolYearId, schoolYears.id))
			.groupBy(schoolYears.id, schoolYears.label, schoolYears.startsOn)
			.orderBy(desc(schoolYears.startsOn)),
		// Indicateur 3.2 sur 90 jours : jours saisis, jours servis, repas servis.
		db
			.select({
				entries: count(),
				served: sql`count(*) filter (where ${mealDays.served})`.mapWith(Number),
				meals: sql`coalesce(sum(${mealDays.mealsCount}) filter (where ${mealDays.served}), 0)`.mapWith(
					Number
				)
			})
			.from(mealDays)
			.where(gte(mealDays.date, from90)),
		// Indicateur 3.1 : enfants mesurés au moins une fois sur 90 jours.
		db
			.select({
				measured: sql`count(distinct ${growthMeasurements.beneficiaryId})`.mapWith(Number)
			})
			.from(growthMeasurements)
			.where(gte(growthMeasurements.measuredOn, from90)),
		// Indicateur 2.1 : taux d'occupation du centre, mois par mois.
		db
			.select({
				month: courseAttendance.month,
				attendance: sql`sum(${courseAttendance.averageAttendance})`.mapWith(Number),
				capacity: sql`sum(${courses.capacity})`.mapWith(Number)
			})
			.from(courseAttendance)
			.innerJoin(courses, eq(courseAttendance.courseId, courses.id))
			.where(gte(courseAttendance.month, from6Months))
			.groupBy(courseAttendance.month)
			.orderBy(asc(courseAttendance.month)),
		loadStripeSummary()
	])

	return {
		yearLabel: currentYear?.label ?? null,
		stats: {
			children: childCount.n,
			schools: schoolCount.n,
			sponsoredNow:
				educationByYear.find((y) => y.label === currentYear?.label)?.sponsored ?? 0,
			meals90: meals90,
			growthMeasured90: growth90.measured
		},
		educationByYear,
		attendanceByMonth,
		stripe
	}
}
