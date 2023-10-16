CREATE TABLE IF NOT EXISTS "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" varchar(256) NOT NULL,
	"completed" boolean NOT NULL
);
