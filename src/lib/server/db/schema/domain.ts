import { boolean, date, index, text, timestamp, unique, uuid } from 'drizzle-orm/pg-core'
import { app } from './auth'
import { user } from './auth'

// UUIDv4 PKs on purpose: tables stay small (an NGO's hundreds of rows, not
// millions) so index locality doesn't matter, and client-generatable ids are
// what makes the v2 offline/PWA sync straightforward.

const timestamps = {
	createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true })
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date())
}

export const genderEnum = app.enum('gender', ['female', 'male'])

export const transitionOutcomeEnum = app.enum('transition_outcome', [
	'higher_education',
	'vocational_training',
	'employment',
	'seeking',
	'other',
	'unknown'
])

// One shared person table across the three pillars (sponsorship, youth
// center, nutrition) — the same child flows through several programs.
export const beneficiaries = app.table(
	'beneficiaries',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		fullName: text('full_name').notNull(),
		preferredName: text('preferred_name'),
		gender: genderEnum('gender'),
		birthDate: date('birth_date'),
		notes: text('notes'),
		archived: boolean('archived').notNull().default(false),
		createdBy: text('created_by').references(() => user.id, { onDelete: 'set null' }),
		...timestamps
	},
	(t) => [index('beneficiaries_created_by_idx').on(t.createdBy)]
)

export const schools = app.table('schools', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	locality: text('locality'),
	notes: text('notes'),
	archived: boolean('archived').notNull().default(false),
	...timestamps
})

export const schoolYears = app.table('school_years', {
	id: uuid('id').primaryKey().defaultRandom(),
	label: text('label').notNull().unique(), // « 2025–2026 »
	startsOn: date('starts_on'),
	endsOn: date('ends_on'),
	...timestamps
})

// One row per child per school year. End-of-year outcomes (indicators 1.1
// and 1.2 of the MEAL framework) live inline: exactly one outcome per
// enrollment, recorded when report cards come in.
export const enrollments = app.table(
	'enrollments',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		beneficiaryId: uuid('beneficiary_id')
			.notNull()
			.references(() => beneficiaries.id, { onDelete: 'cascade' }),
		schoolYearId: uuid('school_year_id')
			.notNull()
			.references(() => schoolYears.id, { onDelete: 'restrict' }),
		schoolId: uuid('school_id')
			.notNull()
			.references(() => schools.id, { onDelete: 'restrict' }),
		grade: text('grade').notNull(),
		isSponsored: boolean('is_sponsored').notNull().default(false),
		// null = year still running / not yet recorded
		completedYear: boolean('completed_year'),
		promoted: boolean('promoted'),
		outcomeNotes: text('outcome_notes'),
		...timestamps
	},
	(t) => [
		unique('enrollments_beneficiary_year_unique').on(t.beneficiaryId, t.schoolYearId),
		index('enrollments_school_year_id_idx').on(t.schoolYearId),
		index('enrollments_school_id_idx').on(t.schoolId)
	]
)

// Indicator 1.3 — what graduates do within ~6 months (per graduating cohort).
export const transitions = app.table(
	'transitions',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		beneficiaryId: uuid('beneficiary_id')
			.notNull()
			.references(() => beneficiaries.id, { onDelete: 'cascade' }),
		schoolYearId: uuid('school_year_id')
			.notNull()
			.references(() => schoolYears.id, { onDelete: 'restrict' }),
		outcome: transitionOutcomeEnum('outcome').notNull().default('unknown'),
		followedUpOn: date('followed_up_on'),
		details: text('details'),
		...timestamps
	},
	(t) => [
		unique('transitions_beneficiary_year_unique').on(t.beneficiaryId, t.schoolYearId),
		index('transitions_school_year_id_idx').on(t.schoolYearId)
	]
)

// Donor↔child nominal sponsorship. Schema ready now, UI comes later;
// stripe_customer_id is the bridge to payment data.
export const sponsors = app.table('sponsors', {
	id: uuid('id').primaryKey().defaultRandom(),
	displayName: text('display_name').notNull(),
	email: text('email'),
	stripeCustomerId: text('stripe_customer_id').unique(),
	notes: text('notes'),
	...timestamps
})

export const sponsorships = app.table(
	'sponsorships',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		sponsorId: uuid('sponsor_id')
			.notNull()
			.references(() => sponsors.id, { onDelete: 'cascade' }),
		beneficiaryId: uuid('beneficiary_id')
			.notNull()
			.references(() => beneficiaries.id, { onDelete: 'cascade' }),
		startedOn: date('started_on'),
		endedOn: date('ended_on'),
		notes: text('notes'),
		...timestamps
	},
	(t) => [
		index('sponsorships_sponsor_id_idx').on(t.sponsorId),
		index('sponsorships_beneficiary_id_idx').on(t.beneficiaryId)
	]
)
