import { redirect } from '@sveltejs/kit'
import { count, eq, max } from 'drizzle-orm'
import { getDb } from '$lib/server/db'
import {
	beneficiaries,
	courseAttendance,
	courses,
	growthMeasurements,
	mealDays,
	schools
} from '$lib/server/db/schema'
import { currentMonthInMadagascar, todayInMadagascar } from '$lib/server/portal'
import type { PageServerLoad } from './$types'

// Le tableau de bord ouvre sur l'état du jour : qu'est-ce qui est déjà
// saisi, qu'est-ce qui reste à faire ? Six agrégats légers, en parallèle.
export const load: PageServerLoad = async ({ locals }) => {
	// Chacun son monde : l'accueil des admins est le dashboard global,
	// celui des agents l'état de la saisie du jour.
	if (locals.user?.role === 'admin') redirect(303, '/portal/admin')

	const db = getDb()
	const today = todayInMadagascar()
	const month = currentMonthInMadagascar()

	const [
		[schoolCount],
		[mealsToday],
		[courseCount],
		[attendanceMonth],
		[childCount],
		[lastGrowth]
	] = await Promise.all([
		db.select({ n: count() }).from(schools).where(eq(schools.archived, false)),
		db.select({ n: count() }).from(mealDays).where(eq(mealDays.date, today)),
		db.select({ n: count() }).from(courses).where(eq(courses.archived, false)),
		db.select({ n: count() }).from(courseAttendance).where(eq(courseAttendance.month, month)),
		db.select({ n: count() }).from(beneficiaries).where(eq(beneficiaries.archived, false)),
		db.select({ last: max(growthMeasurements.measuredOn) }).from(growthMeasurements)
	])

	return {
		today,
		month,
		stats: {
			schools: schoolCount.n,
			mealsToday: mealsToday.n,
			courses: courseCount.n,
			attendanceMonth: attendanceMonth.n,
			children: childCount.n,
			lastGrowthOn: lastGrowth.last
		}
	}
}
