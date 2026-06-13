CREATE TABLE "app"."survey_responses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"beneficiary_id" uuid NOT NULL,
	"school_year_id" uuid NOT NULL,
	"term" integer NOT NULL,
	"question_key" text NOT NULL,
	"score" integer NOT NULL,
	"via_kiosk" boolean DEFAULT false NOT NULL,
	"recorded_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "survey_response_unique" UNIQUE("beneficiary_id","school_year_id","term","question_key")
);
--> statement-breakpoint
ALTER TABLE "app"."survey_responses" ADD CONSTRAINT "survey_responses_beneficiary_id_beneficiaries_id_fk" FOREIGN KEY ("beneficiary_id") REFERENCES "app"."beneficiaries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."survey_responses" ADD CONSTRAINT "survey_responses_school_year_id_school_years_id_fk" FOREIGN KEY ("school_year_id") REFERENCES "app"."school_years"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."survey_responses" ADD CONSTRAINT "survey_responses_recorded_by_user_id_fk" FOREIGN KEY ("recorded_by") REFERENCES "app"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "survey_responses_year_term_idx" ON "app"."survey_responses" USING btree ("school_year_id","term");--> statement-breakpoint
CREATE INDEX "survey_responses_beneficiary_idx" ON "app"."survey_responses" USING btree ("beneficiary_id");--> statement-breakpoint
CREATE INDEX "survey_responses_recorded_by_idx" ON "app"."survey_responses" USING btree ("recorded_by");