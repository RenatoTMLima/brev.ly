CREATE TABLE "links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"originalLink" text NOT NULL,
	"shortLink" text NOT NULL,
	"accessNumber" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "links_id_unique" UNIQUE("id")
);
