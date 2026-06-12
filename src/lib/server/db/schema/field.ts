import {
	boolean,
	date,
	index,
	integer,
	numeric,
	text,
	timestamp,
	unique,
	uuid
} from 'drizzle-orm/pg-core'
import { app, user } from './auth'
import { beneficiaries, schools } from './domain'

const timestamps = {
	createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true })
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date())
}

// Les classes du centre de jeunes (couture, informatique, tutorat) — la
// capacité sert au calcul du taux d'occupation (indicateur 2.1). Id = slug
// stable pour pouvoir seeder et référencer sans magie.
export const courses = app.table('courses', {
	id: text('id').primaryKey(), // 'sewing' | 'ict' | 'tutoring' | futurs
	name: text('name').notNull(),
	capacity: integer('capacity').notNull(),
	archived: boolean('archived').notNull().default(false),
	...timestamps
})

// Une ligne par classe et par mois : moyenne de présence (indicateur 2.1,
// « attendance sheets tallied monthly » dans le cadre MEAL).
export const courseAttendance = app.table(
	'course_attendance',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		courseId: text('course_id')
			.notNull()
			.references(() => courses.id, { onDelete: 'cascade' }),
		month: text('month').notNull(), // 'YYYY-MM'
		averageAttendance: numeric('average_attendance', { precision: 5, scale: 1 }).notNull(),
		sessionsHeld: integer('sessions_held'),
		notes: text('notes'),
		recordedBy: text('recorded_by').references(() => user.id, { onDelete: 'set null' }),
		...timestamps
	},
	(t) => [unique('course_attendance_course_month_unique').on(t.courseId, t.month)]
)

// Registre des repas : une ligne par école et par jour de cantine
// (indicateur 3.2 — % de jours de repas effectivement servis).
export const mealDays = app.table(
	'meal_days',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		schoolId: uuid('school_id')
			.notNull()
			.references(() => schools.id, { onDelete: 'restrict' }),
		date: date('date').notNull(),
		served: boolean('served').notNull().default(true),
		mealsCount: integer('meals_count'),
		notes: text('notes'),
		recordedBy: text('recorded_by').references(() => user.id, { onDelete: 'set null' }),
		...timestamps
	},
	(t) => [
		unique('meal_days_school_date_unique').on(t.schoolId, t.date),
		index('meal_days_date_idx').on(t.date)
	]
)

// Mesures taille/poids → IMC (indicateur 3.1 ; classification OMS par âge
// à brancher plus tard côté calcul, les données brutes suffisent pour ça).
export const growthMeasurements = app.table(
	'growth_measurements',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		beneficiaryId: uuid('beneficiary_id')
			.notNull()
			.references(() => beneficiaries.id, { onDelete: 'cascade' }),
		measuredOn: date('measured_on').notNull(),
		heightCm: numeric('height_cm', { precision: 5, scale: 1 }).notNull(),
		weightKg: numeric('weight_kg', { precision: 5, scale: 2 }).notNull(),
		notes: text('notes'),
		recordedBy: text('recorded_by').references(() => user.id, { onDelete: 'set null' }),
		...timestamps
	},
	(t) => [
		unique('growth_beneficiary_date_unique').on(t.beneficiaryId, t.measuredOn),
		index('growth_beneficiary_idx').on(t.beneficiaryId)
	]
)
