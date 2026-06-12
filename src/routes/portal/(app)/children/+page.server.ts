import { and, asc, desc, eq, ilike, sql } from 'drizzle-orm'
import { getDb } from '$lib/server/db'
import { beneficiaries, enrollments, schools, schoolYears } from '$lib/server/db/schema'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
	const db = getDb()
	const q = url.searchParams.get('q')?.trim() ?? ''
	const showArchived = url.searchParams.get('archives') === '1'

	const years = await db.select().from(schoolYears).orderBy(desc(schoolYears.startsOn))
	const today = new Date().toISOString().slice(0, 10)
	const currentYear =
		years.find((y) => y.startsOn && y.endsOn && y.startsOn <= today && today <= y.endsOn) ??
		years[0]

	const children = await db
		.select({
			id: beneficiaries.id,
			fullName: beneficiaries.fullName,
			preferredName: beneficiaries.preferredName,
			gender: beneficiaries.gender,
			birthDate: beneficiaries.birthDate,
			archived: beneficiaries.archived,
			grade: enrollments.grade,
			isSponsored: enrollments.isSponsored,
			schoolName: schools.name
		})
		.from(beneficiaries)
		.leftJoin(
			enrollments,
			and(
				eq(enrollments.beneficiaryId, beneficiaries.id),
				currentYear ? eq(enrollments.schoolYearId, currentYear.id) : sql`false`
			)
		)
		.leftJoin(schools, eq(schools.id, enrollments.schoolId))
		.where(
			and(
				showArchived ? undefined : eq(beneficiaries.archived, false),
				q ? ilike(beneficiaries.fullName, `%${q.replace(/[%_]/g, '\\$&')}%`) : undefined
			)
		)
		.orderBy(asc(beneficiaries.fullName))

	return { children, q, showArchived, currentYearLabel: currentYear?.label ?? null }
}
