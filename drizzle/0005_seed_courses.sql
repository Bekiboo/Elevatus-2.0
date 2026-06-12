-- Les trois classes du centre de jeunes, capacités du cadre MEAL de Rosa
-- (indicateur 2.1 : couture 25, informatique 15, tutorat 40).
INSERT INTO "app"."courses" ("id", "name", "capacity") VALUES
	('sewing', 'Couture', 25),
	('ict', 'Informatique', 15),
	('tutoring', 'Tutorat', 40)
ON CONFLICT ("id") DO NOTHING;
