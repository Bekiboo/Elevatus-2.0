-- Reference data: the running school year and the next one (Malagasy school
-- calendar, roughly October → July). Idempotent on the unique label.
INSERT INTO "app"."school_years" ("label", "starts_on", "ends_on") VALUES
	('2025–2026', '2025-10-01', '2026-07-31'),
	('2026–2027', '2026-10-01', '2027-07-31')
ON CONFLICT ("label") DO NOTHING;
