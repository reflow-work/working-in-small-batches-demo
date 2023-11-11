CREATE TABLE IF NOT EXISTS "integrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"provider" varchar(256) NOT NULL,
	"credentials" jsonb NOT NULL
);
