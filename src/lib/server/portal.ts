import { DateTime } from 'luxon'
import { desc } from 'drizzle-orm'
import type { Db } from './db'
import { schoolYears } from './db/schema'

// Le « jour » du terrain est celui de Madagascar (UTC+3), pas celui du
// serveur — une saisie à 22h heure locale doit tomber sur la bonne date.
export function todayInMadagascar(): string {
	return DateTime.now().setZone('Indian/Antananarivo').toISODate()!
}

export function currentMonthInMadagascar(): string {
	return DateTime.now().setZone('Indian/Antananarivo').toFormat('yyyy-MM')
}

export async function getCurrentSchoolYear(db: Db) {
	const years = await db.select().from(schoolYears).orderBy(desc(schoolYears.startsOn))
	const today = todayInMadagascar()
	return (
		years.find((y) => y.startsOn && y.endsOn && y.startsOn <= today && today <= y.endsOn) ??
		years[0] ??
		null
	)
}
