CREATE TABLE IF NOT EXISTS "google_chat_credentials" (
	"id" serial PRIMARY KEY NOT NULL,
	"access_token" varchar(256) NOT NULL,
	"refresh_token" varchar(256) NOT NULL,
	"expiry_date" timestamp NOT NULL
);
