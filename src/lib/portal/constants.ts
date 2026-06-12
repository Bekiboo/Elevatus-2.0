// Système scolaire malgache (cursus francophone). rank = ordre de progression,
// utilisé pour calculer le passage en classe supérieure (indicateur 1.2).
export const GRADES = [
	{ value: 'CP1', rank: 1, cycle: 'Primaire' },
	{ value: 'CP2', rank: 2, cycle: 'Primaire' },
	{ value: 'CE', rank: 3, cycle: 'Primaire' },
	{ value: 'CM1', rank: 4, cycle: 'Primaire' },
	{ value: 'CM2', rank: 5, cycle: 'Primaire' },
	{ value: '6e', rank: 6, cycle: 'Collège' },
	{ value: '5e', rank: 7, cycle: 'Collège' },
	{ value: '4e', rank: 8, cycle: 'Collège' },
	{ value: '3e', rank: 9, cycle: 'Collège' },
	{ value: '2nde', rank: 10, cycle: 'Lycée' },
	{ value: '1ère', rank: 11, cycle: 'Lycée' },
	{ value: 'Terminale', rank: 12, cycle: 'Lycée' }
] as const

export type Grade = (typeof GRADES)[number]['value']

export const GRADE_VALUES = GRADES.map((g) => g.value)

export function gradeRank(grade: string): number | undefined {
	return GRADES.find((g) => g.value === grade)?.rank
}

export const GENDER_LABELS: Record<string, string> = {
	female: 'Fille',
	male: 'Garçon'
}

export const TRANSITION_OUTCOME_LABELS: Record<string, string> = {
	higher_education: 'Études supérieures',
	vocational_training: 'Formation professionnelle',
	employment: 'Emploi',
	seeking: 'En recherche',
	other: 'Autre',
	unknown: 'Inconnu'
}
