

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE OR REPLACE FUNCTION public.ingredient_for_recipe_ingredient(search recipe_ingredients)
--  RETURNS SETOF ingredients
--  LANGUAGE sql
--  STABLE
-- AS $function$
-- SELECT *
-- FROM ingredients WHERE name = search.name;
--
-- $function$;

alter table "public"."recipe_ingredients" alter column "food_id" drop not null;
alter table "public"."recipe_ingredients" add column "food_id" int4;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE OR REPLACE VIEW "public"."most_common_ingredients" AS
--  SELECT recipe_ingredients.name,
--     count(*) AS ingredient_count,
--     (SELECT id FROM ingredients WHERE name = recipe_ingredients.name)
--    FROM recipe_ingredients
--   GROUP BY recipe_ingredients.name
--   ORDER BY (count(*)) DESC;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE OR REPLACE VIEW "public"."most_common_ingredients" AS
--  SELECT recipe_ingredients.name,
--     count(*) AS ingredient_count,
--     (SELECT id FROM ingredients WHERE name = recipe_ingredients.name)
--    FROM recipe_ingredients
--   GROUP BY recipe_ingredients.name
--   ORDER BY (count(*)) DESC;

alter table "public"."ingredient_food_candidate" drop constraint "ingredient_food_candidate_food_candidate_id_food_candidate_portion_id_key";

alter table "public"."ingredient_food_candidate" alter column "ingredient_id" set default gen_random_uuid();
alter table "public"."ingredient_food_candidate" add constraint "ingredient_food_candidate_food_candidate_id_food_candidate_port" unique (ingredient_id, food_candidate_portion_id, food_candidate_id);
alter table "public"."ingredient_food_candidate"
  add constraint "ingredient_food_candidate_ingredient_id_fkey"
  foreign key (ingredient_id)
  references "public"."ingredients"
  (id) on update cascade on delete cascade;
alter table "public"."ingredient_food_candidate" alter column "ingredient_id" drop not null;
alter table "public"."ingredient_food_candidate" add column "ingredient_id" uuid;

alter table "public"."ingredients" drop constraint "ingredients_food_candidate_id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."ingredients" add column "food_candidate_id" integer
--  null;

alter table "public"."ingredients" alter column "wiki_url" set not null;

comment on column "public"."ingredients"."fdc_id" is E'Ingredients used in recipes.';
alter table "public"."ingredients"
  add constraint "ingredients_fdc_id_fkey"
  foreign key (fdc_id)
  references "public"."food"
  (fdc_id) on update no action on delete no action;
alter table "public"."ingredients" alter column "fdc_id" drop not null;
alter table "public"."ingredients" add column "fdc_id" int4;

alter table "public"."ingredients" drop constraint "ingredients_name_key";

alter table "public"."ingredient_food_candidate" drop constraint "ingredient_food_candidate_food_candidate_id_food_candidate_portion_id_ingredient_id_key";

CREATE  INDEX "ingredient_food_candidate_idx" on
  "public"."ingredient_food_candidate" using btree ("food_candidate_id", "food_candidate_portion_id", "ingredient_id");

DROP INDEX IF EXISTS "public"."ingredient_food_candidate_idx";

alter table "public"."ingredient_food_candidate" drop constraint "ingredient_food_candidate_ingredient_id_fkey";

alter table "public"."ingredient_food_candidate" drop column "ingredient_id" cascade
alter table "public"."ingredient_food_candidate" drop column "ingredient_id";
-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "public"."ingredient_food_candidate" add constraint "recipe_ingredient_food_candidate_recipe_ingredient_id_food_cand" unique (recipe_ingredient_id, food_candidate_id);
alter table "public"."ingredient_food_candidate" alter column "recipe_ingredient_id" drop not null;
alter table "public"."ingredient_food_candidate" add column "recipe_ingredient_id" int4;

alter table "public"."ingredient_food_candidate" rename to "recipe_ingredient_food_candidate";

alter table "public"."recipe_ingredient_food_candidate"
  add constraint "recipe_ingredient_food_candidate_recipe_ingredient_id_fkey"
  foreign key ("recipe_ingredient_id")
  references "public"."recipe_ingredients"
  ("id") on update cascade on delete cascade;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE OR REPLACE FUNCTION public.food_candidates_for_ingredient(search ingredients)
--  RETURNS SETOF food
--  LANGUAGE sql
--  STABLE
-- AS $function$
-- SELECT *
-- FROM search_foods(search.name);
--
-- $function$;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE OR REPLACE FUNCTION public.food_candidates_for_ingredient(search ingredients)
--  RETURNS SETOF food
--  LANGUAGE sql
--  STABLE
-- AS $function$
-- SELECT *
-- FROM search_foods(search.name);
--
-- $function$;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."ingredients" add column "name" text
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE OR REPLACE FUNCTION public.food_candidates_for_recipe_ingredient(search recipe_ingredients)
--  RETURNS SETOF food
--  LANGUAGE sql
--  STABLE
-- AS $function$
-- SELECT *
-- FROM search_foods(search.name);
--
-- $function$;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE OR REPLACE FUNCTION public.food_candidates_for_ingredient(search recipe_ingredients)
--  RETURNS SETOF food
--  LANGUAGE sql
--  STABLE
-- AS $function$
-- SELECT *
-- FROM search_foods(search.name);
--
-- $function$;

DROP TABLE "public"."ingredient_names";

comment on column "public"."ingredients"."names" is E'Ingredients used in recipes.';
alter table "public"."ingredients" alter column "names" drop not null;
alter table "public"."ingredients" add column "names" _text;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE OR REPLACE VIEW "public"."most_common_ingredients" AS
--  SELECT
--     recipe_ingredients.name,
--     count(*) AS ingredient_count
--    FROM recipe_ingredients
--   GROUP BY recipe_ingredients.name
--   ORDER BY (count(*)) DESC;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP VIEW "public"."most_common_ingredients";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE OR REPLACE VIEW "public"."most_common_ingredients" AS
--  SELECT recipe_ingredients.id,
--     recipe_ingredients.name,
--     count(*) AS ingredient_count
--    FROM recipe_ingredients
--   GROUP BY recipe_ingredients.name, recipe_ingredients.id
--   ORDER BY ingredient_count DESC;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE OR REPLACE VIEW "public"."most_common_ingredients" AS
--     SELECT
--     id, name, count(*) AS ingredient_count
--     FROM recipe_ingredients
--     GROUP BY name, id
--     ORDER BY ingredient_count DESC;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE OR REPLACE VIEW "public"."most_common_ingredients" AS
--  SELECT recipe_ing.id,
--     recipe_ing.name,
--     ing.ingredient_count
--     FROM (
--         SELECT recipe_ingredients.name, count(*) AS ingredient_count
--         FROM recipe_ingredients
--         GROUP BY recipe_ingredients.name
--     ) ing
--     JOIN recipe_ingredients recipe_ing ON recipe_ing.name = ing.name
--     ORDER BY ing.ingredient_count DESC;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP VIEW "public"."most_common_ingredients";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE OR REPLACE VIEW "public"."most_common_ingredients" AS
--  SELECT recipe_ing.id, recipe_ing.name, ing.ingredient_count FROM (
--    SELECT
--    name, count(*) AS ingredient_count
--    FROM recipe_ingredients
--   GROUP BY name
--   ORDER BY (count(*)) DESC
--   ) ing JOIN recipe_ingredients recipe_ing ON recipe_ing.name = ing.name;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP VIEW "public"."most_common_ingredients";
