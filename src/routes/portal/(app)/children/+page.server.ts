import { and, asc, eq, ilike, sql } from 'drizzle-orm'
import { getDb } from '$lib/server/db'
import { beneficiaries, enrollments, schools } from '$lib/server/db/schema'
import { getCurrentSchoolYear } from '$lib/server/portal'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
	const db = getDb()
	const q = url.searchParams.get('q')?.trim() ?? ''
	const showArchived = url.searchParams.get('archives') === '1'

	const currentYear = await getCurrentSchoolYear(db)

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
