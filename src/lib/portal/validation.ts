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

export function formErrors(error: z.ZodError): string {
	return error.issues.map((i) => i.message).join(' · ')
}
