import { z } from 'zod'
import { GRADE_VALUES } from './constants'

// Tolérant aux champs absents (undefined) ET vides ('') — les deux deviennent null.
const optionalTrimmed = z
	.string()
	.nullish()
	.transform((v) => {
		const t = v?.trim() ?? ''
		return t === '' ? null : t
	})

const optionalDate = optionalTrimmed.refine(
	(v) => v === null || !Number.isNaN(Date.parse(v)),
	'Date invalide'
)

export const childSchema = z.object({
	fullName: z.string().trim().min(1, 'Le nom complet est requis'),
	preferredName: optionalTrimmed,
	gender: z.preprocess(
		(v) => (v == null || v === '' ? null : v),
		z.enum(['female', 'male']).nullable()
	),
	birthDate: optionalDate,
	notes: optionalTrimmed
})

export const schoolSchema = z.object({
	name: z.string().trim().min(1, "Le nom de l'école est requis"),
	locality: optionalTrimmed,
	notes: optionalTrimmed
})

export const enrollmentSchema = z.object({
	schoolYearId: z.uuid('Année scolaire requise'),
	schoolId: z.uuid('École requise'),
	grade: z.string().refine((v) => (GRADE_VALUES as readonly string[]).includes(v), 'Classe invalide'),
	isSponsored: z
		.literal('on')
		.optional()
		.transform((v) => v === 'on')
})

// Tri-state oui/non/inconnu venant de <select> — '' ou absent = pas renseigné.
const triState = z
	.enum(['', 'yes', 'no'])
	.nullish()
	.transform((v) => (v == null || v === '' ? null : v === 'yes'))

export const outcomeSchema = z.object({
	enrollmentId: z.uuid(),
	completedYear: triState,
	promoted: triState
})

// Nombre saisi dans un <input> — accepte la virgule décimale (claviers FR).
function numberField(min: number, max: number, label: string) {
	return z
		.string()
		.trim()
		.min(1, `${label} requis`)
		.transform((v) => Number(v.replace(',', '.')))
		.refine((n) => !Number.isNaN(n) && n >= min && n <= max, `${label} invalide (${min}–${max})`)
}

const dateField = z
	.string()
	.trim()
	.refine((v) => /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v)), 'Date invalide')

export const mealDaySchema = z.object({
	schoolId: z.uuid('École requise'),
	date: dateField,
	served: z.enum(['yes', 'no']).transform((v) => v === 'yes'),
	mealsCount: z
		.string()
		.nullish()
		.transform((v) => {
			const t = v?.trim() ?? ''
			return t === '' ? null : Number(t)
		})
		.refine((n) => n === null || (Number.isInteger(n) && n >= 0 && n <= 2000), 'Nombre invalide'),
	notes: optionalTrimmed
})

export const growthSchema = z.object({
	beneficiaryId: z.uuid(),
	measuredOn: dateField,
	heightCm: numberField(50, 220, 'Taille (cm)'),
	weightKg: numberField(5, 150, 'Poids (kg)')
})

export const attendanceSchema = z.object({
	courseId: z.string().min(1, 'Classe requise'),
	month: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Mois invalide'),
	averageAttendance: numberField(0, 500, 'Présence moyenne'),
	sessionsHeld: z
		.string()
		.nullish()
		.transform((v) => {
			const t = v?.trim() ?? ''
			return t === '' ? null : Number(t)
		})
		.refine((n) => n === null || (Number.isInteger(n) && n >= 0 && n <= 60), 'Nombre invalide'),
	notes: optionalTrimmed
})

export function formErrors(error: z.ZodError): string {
	return error.issues.map((i) => i.message).join(' · ')
}
