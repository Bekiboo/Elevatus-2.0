CREATE TABLE "app"."course_attendance" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"course_id" text NOT NULL,
	"month" text NOT NULL,
	"average_attendance" numeric(5, 1) NOT NULL,
	"sessions_held" integer,
	"notes" text,
	"recorded_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "course_attendance_course_month_unique" UNIQUE("course_id","month")
);
--> statement-breakpoint
CREATE TABLE "app"."courses" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"capacity" integer NOT NULL,
	"archived" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "app"."growth_measurements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"beneficiary_id" uuid NOT NULL,
	"measured_on" date NOT NULL,
	"height_cm" numeric(5, 1) NOT NULL,
	"weight_kg" numeric(5, 2) NOT NULL,
	"notes" text,
	"recorded_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "growth_beneficiary_date_unique" UNIQUE("beneficiary_id","measured_on")
);
--> statement-breakpoint
CREATE TABLE "app"."meal_days" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"school_id" uuid NOT NULL,
	"date" date NOT NULL,
	"served" boolean DEFAULT true NOT NULL,
	"meals_count" integer,
	"notes" text,
	"recorded_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "meal_days_school_date_unique" UNIQUE("school_id","date")
);
--> statement-breakpoint
ALTER TABLE "app"."course_attendance" ADD CONSTRAINT "course_attendance_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "app"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."course_attendance" ADD CONSTRAINT "course_attendance_recorded_by_user_id_fk" FOREIGN KEY ("recorded_by") REFERENCES "app"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."growth_measurements" ADD CONSTRAINT "growth_measurements_beneficiary_id_beneficiaries_id_fk" FOREIGN KEY ("beneficiary_id") REFERENCES "app"."beneficiaries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."growth_measurements" ADD CONSTRAINT "growth_measurements_recorded_by_user_id_fk" FOREIGN KEY ("recorded_by") REFERENCES "app"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."meal_days" ADD CONSTRAINT "meal_days_school_id_schools_id_fk" FOREIGN KEY ("school_id") REFERENCES "app"."schools"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."meal_days" ADD CONSTRAINT "meal_days_recorded_by_user_id_fk" FOREIGN KEY ("recorded_by") REFERENCES "app"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "growth_beneficiary_idx" ON "app"."growth_measurements" USING btree ("beneficiary_id");--> statement-breakpoint
CREATE INDEX "meal_days_date_idx" ON "app"."meal_days" USING btree ("date");