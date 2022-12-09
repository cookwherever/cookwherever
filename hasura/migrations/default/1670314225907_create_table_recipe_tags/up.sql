CREATE TABLE "recipe"."tags" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "recipe_id" uuid NOT NULL, "name" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("recipe_id") REFERENCES "recipe"."recipe"("id") ON UPDATE cascade ON DELETE cascade, UNIQUE ("recipe_id", "name"));COMMENT ON TABLE "recipe"."tags" IS E'Tags of attributes about a recipe.';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
