import { DateTime } from 'luxon'
import { asc, desc, eq } from 'drizzle-orm'
import { error } from '@sveltejs/kit'
import type { Db } from './db'
import { schools, schoolYears } from './db/schema'

// Le « jour » du terrain est celui de Madagascar (UTC+3), pas celui du
// serveur — une saisie à 22h heure locale doit tomber sur la bonne date.
export function todayInMadagascar(): string {
	return DateTime.now().setZone('Indian/Antananarivo').toISODate()!
}

export function currentMonthInMadagascar(): string {
	return DateTime.now().setZone('Indian/Antananarivo').toFormat('yyyy-MM')
}

// Année scolaire « courante » : celle qui contient aujourd'hui, sinon la
// dernière COMMENCÉE (pendant le creux août–septembre, c'est l'année qui
// vient de se terminer qui doit rester active, pas la future).
export async function getCurrentSchoolYear(db: Db) {
	const years = await db.select().from(schoolYears).orderBy(desc(schoolYears.startsOn))
	const today = todayInMadagascar()
	return (
		years.find((y) => y.startsOn && y.endsOn && y.startsOn <= today && today <= y.endsOn) ??
		years.find((y) => y.startsOn && y.startsOn <= today) ??
		years[0] ??
		null
	)
}

export async function getActiveSchools(db: Db) {
	return db.select().from(schools).where(eq(schools.archived, false)).orderBy(asc(schools.name))
}

// Résout le paramètre ?ecole= vers une école existante (défaut : la première).
export function resolveSelectedSchool<T extends { id: string }>(
	allSchools: T[],
	url: URL
): string | null {
	return allSchools.find((s) => s.id === url.searchParams.get('ecole'))?.id ?? allSchools[0]?.id ?? null
}

// Garde d'autorisation : à appeler en tête des actions destructrices.
// Politique : suppressions définitives = admin ; saisie/corrections = staff.
export function requireAdmin(locals: App.Locals) {
	if (locals.user?.role !== 'admin') {
		error(403, 'Action réservée aux administrateurs')
	}
}
