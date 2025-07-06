CREATE TABLE "urls" (
	"id" text PRIMARY KEY NOT NULL,
	"originalUrl" text NOT NULL,
	"shortUrl" text NOT NULL,
	"accesses" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "urls_id_unique" UNIQUE("id")
);
