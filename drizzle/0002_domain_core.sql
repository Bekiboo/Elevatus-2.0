CREATE TYPE "app"."gender" AS ENUM('female', 'male');--> statement-breakpoint
CREATE TYPE "app"."transition_outcome" AS ENUM('higher_education', 'vocational_training', 'employment', 'seeking', 'other', 'unknown');--> statement-breakpoint
CREATE TABLE "app"."beneficiaries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" text NOT NULL,
	"preferred_name" text,
	"gender" "app"."gender",
	"birth_date" date,
	"notes" text,
	"archived" boolean DEFAULT false NOT NULL,
	"created_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "app"."enrollments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"beneficiary_id" uuid NOT NULL,
	"school_year_id" uuid NOT NULL,
	"school_id" uuid NOT NULL,
	"grade" text NOT NULL,
	"is_sponsored" boolean DEFAULT false NOT NULL,
	"completed_year" boolean,
	"promoted" boolean,
	"outcome_notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "enrollments_beneficiary_year_unique" UNIQUE("beneficiary_id","school_year_id")
);
--> statement-breakpoint
CREATE TABLE "app"."school_years" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"label" text NOT NULL,
	"starts_on" date,
	"ends_on" date,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "school_years_label_unique" UNIQUE("label")
);
--> statement-breakpoint
CREATE TABLE "app"."schools" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"locality" text,
	"notes" text,
	"archived" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "app"."sponsors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"display_name" text NOT NULL,
	"email" text,
	"stripe_customer_id" text,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "sponsors_stripe_customer_id_unique" UNIQUE("stripe_customer_id")
);
--> statement-breakpoint
CREATE TABLE "app"."sponsorships" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sponsor_id" uuid NOT NULL,
	"beneficiary_id" uuid NOT NULL,
	"started_on" date,
	"ended_on" date,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "app"."transitions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"beneficiary_id" uuid NOT NULL,
	"school_year_id" uuid NOT NULL,
	"outcome" "app"."transition_outcome" DEFAULT 'unknown' NOT NULL,
	"followed_up_on" date,
	"details" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "transitions_beneficiary_year_unique" UNIQUE("beneficiary_id","school_year_id")
);
--> statement-breakpoint
ALTER TABLE "app"."beneficiaries" ADD CONSTRAINT "beneficiaries_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "app"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."enrollments" ADD CONSTRAINT "enrollments_beneficiary_id_beneficiaries_id_fk" FOREIGN KEY ("beneficiary_id") REFERENCES "app"."beneficiaries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."enrollments" ADD CONSTRAINT "enrollments_school_year_id_school_years_id_fk" FOREIGN KEY ("school_year_id") REFERENCES "app"."school_years"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."enrollments" ADD CONSTRAINT "enrollments_school_id_schools_id_fk" FOREIGN KEY ("school_id") REFERENCES "app"."schools"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."sponsorships" ADD CONSTRAINT "sponsorships_sponsor_id_sponsors_id_fk" FOREIGN KEY ("sponsor_id") REFERENCES "app"."sponsors"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."sponsorships" ADD CONSTRAINT "sponsorships_beneficiary_id_beneficiaries_id_fk" FOREIGN KEY ("beneficiary_id") REFERENCES "app"."beneficiaries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."transitions" ADD CONSTRAINT "transitions_beneficiary_id_beneficiaries_id_fk" FOREIGN KEY ("beneficiary_id") REFERENCES "app"."beneficiaries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."transitions" ADD CONSTRAINT "transitions_school_year_id_school_years_id_fk" FOREIGN KEY ("school_year_id") REFERENCES "app"."school_years"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "enrollments_school_year_id_idx" ON "app"."enrollments" USING btree ("school_year_id");--> statement-breakpoint
CREATE INDEX "enrollments_school_id_idx" ON "app"."enrollments" USING btree ("school_id");--> statement-breakpoint
CREATE INDEX "sponsorships_sponsor_id_idx" ON "app"."sponsorships" USING btree ("sponsor_id");--> statement-breakpoint
CREATE INDEX "sponsorships_beneficiary_id_idx" ON "app"."sponsorships" USING btree ("beneficiary_id");--> statement-breakpoint
CREATE INDEX "transitions_school_year_id_idx" ON "app"."transitions" USING btree ("school_year_id");