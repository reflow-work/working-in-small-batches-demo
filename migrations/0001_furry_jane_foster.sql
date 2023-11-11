CREATE TABLE IF NOT EXISTS "slack_credentials" (
	"id" serial PRIMARY KEY NOT NULL,
	"token" varchar(256) NOT NULL
);
