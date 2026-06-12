CREATE INDEX "beneficiaries_created_by_idx" ON "app"."beneficiaries" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX "course_attendance_recorded_by_idx" ON "app"."course_attendance" USING btree ("recorded_by");--> statement-breakpoint
CREATE INDEX "growth_recorded_by_idx" ON "app"."growth_measurements" USING btree ("recorded_by");--> statement-breakpoint
CREATE INDEX "meal_days_recorded_by_idx" ON "app"."meal_days" USING btree ("recorded_by");