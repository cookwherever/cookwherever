CREATE TABLE "public"."ingredients" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "wiki_url" text NOT NULL, "fdc_id" integer NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("fdc_id") REFERENCES "public"."food"("fdc_id") ON UPDATE no action ON DELETE no action);COMMENT ON TABLE "public"."ingredients" IS E'Ingredients used in recipes.';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
