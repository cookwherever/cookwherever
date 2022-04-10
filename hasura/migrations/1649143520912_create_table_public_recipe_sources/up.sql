CREATE TABLE "public"."recipe_sources" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, "url" text NOT NULL, "description" text NOT NULL, PRIMARY KEY ("id") );COMMENT ON TABLE "public"."recipe_sources" IS E'Sources from where recipes come from.';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
