-- The app connects as the dedicated least-privilege role "elevatus_app"
-- (created outside migrations, via MCP). Tables are owned by "postgres"
-- (migrations run through the Supabase MCP), so the app role needs explicit
-- DML grants — including on future tables of the "app" schema.
GRANT USAGE ON SCHEMA "app" TO elevatus_app;
--> statement-breakpoint
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA "app" TO elevatus_app;
--> statement-breakpoint
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA "app" TO elevatus_app;
--> statement-breakpoint
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA "app"
	GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO elevatus_app;
--> statement-breakpoint
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA "app"
	GRANT USAGE, SELECT ON SEQUENCES TO elevatus_app;
