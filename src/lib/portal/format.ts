import { DateTime } from 'luxon'

// Helpers d'affichage partagés par les pages du portail (côté client).

export function age(birthDate: string | null): string {
	if (!birthDate) return '—'
	const years = Math.floor(-DateTime.fromISO(birthDate).diffNow('years').years)
	return Number.isFinite(years) && years >= 0 ? `${years} ans` : '—'
}

export function fmtDate(iso: string): string {
	return DateTime.fromISO(iso).setLocale('fr').toFormat('d LLL yyyy')
}

// « jeudi 12 juin » — la date du tableau de bord.
export function fmtDayLong(iso: string): string {
	return DateTime.fromISO(iso).setLocale('fr').toFormat('cccc d LLLL')
}

export function monthLabel(month: string): string {
	return DateTime.fromFormat(month, 'yyyy-MM').setLocale('fr').toFormat('LLLL yyyy')
}

export function bmi(heightCm: string | number, weightKg: string | number): string {
	const h = Number(heightCm) / 100
	const w = Number(weightKg)
	if (!h || !w) return '—'
	return (w / (h * h)).toFixed(1)
}
