import { fail, type ActionFailure } from '@sveltejs/kit'
import { z } from 'zod'
import { GRADE_VALUES } from './constants'

// ——— briques ———

// Tolérant aux champs absents (undefined) ET vides ('') — les deux deviennent null.
const optionalTrimmed = z
	.string()
	.nullish()
	.transform((v) => {
		const t = v?.trim() ?? ''
		return t === '' ? null : t
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

// Entier facultatif ('' ou absent → null).
function optionalIntField(max: number) {
	return z
		.string()
		.nullish()
		.transform((v) => {
			const t = v?.trim() ?? ''
			return t === '' ? null : Number(t)
		})
		.refine((n) => n === null || (Number.isInteger(n) && n >= 0 && n <= max), 'Nombre invalide')
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/

// Pour valider les params d'URL (route ou query) sans 500 Postgres (22P02).
export function isUuid(v: string | null | undefined): v is string {
	return !!v && UUID_RE.test(v)
}

export function isIsoDate(v: string | null | undefined): v is string {
	return !!v && ISO_DATE_RE.test(v) && !Number.isNaN(Date.parse(v))
}

const dateField = z.string().trim().refine(isIsoDate, 'Date invalide')

// Tri-state oui/non/inconnu venant de <select> — '' ou absent = pas renseigné.
const triState = z
	.enum(['', 'yes', 'no'])
	.nullish()
	.transform((v) => (v == null || v === '' ? null : v === 'yes'))

// ——— schémas ———

export const childSchema = z.object({
	fullName: z.string().trim().min(1, 'Le nom complet est requis'),
	preferredName: optionalTrimmed,
	gender: z.preprocess(
		(v) => (v == null || v === '' ? null : v),
		z.enum(['female', 'male']).nullable()
	),
	birthDate: z.preprocess((v) => (v == null || v === '' ? null : v), dateField.nullable()),
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

export const outcomeSchema = z.object({
	enrollmentId: z.uuid(),
	completedYear: triState,
	promoted: triState
})

export const mealDaySchema = z.object({
	schoolId: z.uuid('École requise'),
	date: dateField,
	served: z.enum(['yes', 'no']).transform((v) => v === 'yes'),
	mealsCount: optionalIntField(2000),
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
	sessionsHeld: optionalIntField(60),
	notes: optionalTrimmed
})

// ——— le pattern d'action partagé ———

export type FormFailure = ActionFailure<{
	formId: string
	error: string
	values?: Record<string, string>
}>

type ParseResult<S extends z.ZodType> =
	| { ok: true; data: z.output<S> }
	| { ok: false; failure: FormFailure }

// Toutes les actions du portail suivent ce motif : parse → fail(400) ciblé
// sur le formulaire (`formId`) ou données typées. `withValues` renvoie les
// valeurs saisies pour préremplir le formulaire après l'erreur.
export function parseForm<S extends z.ZodType>(
	schema: S,
	formData: FormData,
	formId: string,
	opts: { withValues?: boolean } = {}
): ParseResult<S> {
	const raw = Object.fromEntries(formData)
	const parsed = schema.safeParse(raw)
	if (!parsed.success) {
		return {
			ok: false,
			failure: fail(400, {
				formId,
				error: parsed.error.issues.map((i) => i.message).join(' · '),
				...(opts.withValues
					? { values: Object.fromEntries(formData) as Record<string, string> }
					: {})
			})
		}
	}
	return { ok: true, data: parsed.data }
}
