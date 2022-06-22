
DROP VIEW "public"."most_common_ingredients";

CREATE OR REPLACE VIEW "public"."most_common_ingredients" AS 
 SELECT recipe_ing.id, recipe_ing.name, ing.ingredient_count FROM (
   SELECT
   name, count(*) AS ingredient_count
   FROM recipe_ingredients
  GROUP BY name
  ORDER BY (count(*)) DESC
  ) ing JOIN recipe_ingredients recipe_ing ON recipe_ing.name = ing.name;

DROP VIEW "public"."most_common_ingredients";

CREATE OR REPLACE VIEW "public"."most_common_ingredients" AS 
 SELECT recipe_ing.id,
    recipe_ing.name,
    ing.ingredient_count
    FROM (
        SELECT recipe_ingredients.name, count(*) AS ingredient_count
        FROM recipe_ingredients
        GROUP BY recipe_ingredients.name
    ) ing
    JOIN recipe_ingredients recipe_ing ON recipe_ing.name = ing.name
    ORDER BY ing.ingredient_count DESC;

CREATE OR REPLACE VIEW "public"."most_common_ingredients" AS 
    SELECT
    id, name, count(*) AS ingredient_count
    FROM recipe_ingredients
    GROUP BY name, id
    ORDER BY ingredient_count DESC;

CREATE OR REPLACE VIEW "public"."most_common_ingredients" AS 
 SELECT recipe_ingredients.id,
    recipe_ingredients.name,
    count(*) AS ingredient_count
   FROM recipe_ingredients
  GROUP BY recipe_ingredients.name, recipe_ingredients.id
  ORDER BY ingredient_count DESC;

DROP VIEW "public"."most_common_ingredients";

CREATE OR REPLACE VIEW "public"."most_common_ingredients" AS 
 SELECT
    recipe_ingredients.name,
    count(*) AS ingredient_count
   FROM recipe_ingredients
  GROUP BY recipe_ingredients.name
  ORDER BY (count(*)) DESC;

alter table "public"."ingredients" drop column "names" cascade;

CREATE TABLE "public"."ingredient_names" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, "ingredient_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("ingredient_id") REFERENCES "public"."ingredients"("id") ON UPDATE cascade ON DELETE cascade);COMMENT ON TABLE "public"."ingredient_names" IS E'Names of ingredients';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION public.food_candidates_for_ingredient(search recipe_ingredients)
 RETURNS SETOF food
 LANGUAGE sql
 STABLE
AS $function$
SELECT *
FROM search_foods(search.name);

$function$;

CREATE OR REPLACE FUNCTION public.food_candidates_for_recipe_ingredient(search recipe_ingredients)
 RETURNS SETOF food
 LANGUAGE sql
 STABLE
AS $function$
SELECT *
FROM search_foods(search.name);

$function$;

alter table "public"."ingredients" add column "name" text
 null;

CREATE OR REPLACE FUNCTION public.food_candidates_for_ingredient(search ingredients)
 RETURNS SETOF food
 LANGUAGE sql
 STABLE
AS $function$
SELECT *
FROM search_foods(search.name);

$function$;

CREATE OR REPLACE FUNCTION public.food_candidates_for_ingredient(search ingredients)
 RETURNS SETOF food
 LANGUAGE sql
 STABLE
AS $function$
SELECT *
FROM search_foods(search.name);

$function$;


alter table "public"."recipe_ingredient_food_candidate" drop constraint "recipe_ingredient_food_candidate_recipe_ingredient_id_fkey";

alter table "public"."recipe_ingredient_food_candidate" rename to "ingredient_food_candidate";

alter table "public"."ingredient_food_candidate" drop column "recipe_ingredient_id" cascade;

CREATE EXTENSION IF NOT EXISTS pgcrypto;
alter table "public"."ingredient_food_candidate" add column "ingredient_id" uuid
 null default gen_random_uuid();

alter table "public"."ingredient_food_candidate"
  add constraint "ingredient_food_candidate_ingredient_id_fkey"
  foreign key ("ingredient_id")
  references "public"."ingredients"
  ("id") on update cascade on delete cascade;

CREATE UNIQUE INDEX "ingredient_food_candidate_idx" on
  "public"."ingredient_food_candidate" using btree ("ingredient_id", "food_candidate_id", "food_candidate_portion_id");

DROP INDEX IF EXISTS "public"."ingredient_food_candidate_idx";

alter table "public"."ingredient_food_candidate" add constraint "ingredient_food_candidate_food_candidate_id_food_candidate_portion_id_ingredient_id_key" unique ("food_candidate_id", "food_candidate_portion_id", "ingredient_id");

alter table "public"."ingredients" add constraint "ingredients_name_key" unique ("name");

alter table "public"."ingredients" drop column "fdc_id" cascade;

alter table "public"."ingredients" alter column "wiki_url" drop not null;

alter table "public"."ingredients" add column "food_candidate_id" integer
 null;

alter table "public"."ingredients"
  add constraint "ingredients_food_candidate_id_fkey"
  foreign key ("food_candidate_id")
  references "public"."ingredient_food_candidate"
  ("id") on update cascade on delete cascade;

alter table "public"."ingredient_food_candidate" drop column "ingredient_id" cascade;

alter table "public"."ingredient_food_candidate" add constraint "ingredient_food_candidate_food_candidate_id_food_candidate_portion_id_key" unique ("food_candidate_id", "food_candidate_portion_id");

CREATE OR REPLACE VIEW "public"."most_common_ingredients" AS 
 SELECT recipe_ingredients.name,
    count(*) AS ingredient_count,
    (SELECT id FROM ingredients WHERE name = recipe_ingredients.name)
   FROM recipe_ingredients
  GROUP BY recipe_ingredients.name
  ORDER BY (count(*)) DESC;

CREATE OR REPLACE VIEW "public"."most_common_ingredients" AS 
 SELECT recipe_ingredients.name,
    count(*) AS ingredient_count,
    (SELECT id FROM ingredients WHERE name = recipe_ingredients.name)
   FROM recipe_ingredients
  GROUP BY recipe_ingredients.name
  ORDER BY (count(*)) DESC;

alter table "public"."recipe_ingredients" drop column "food_id" cascade;

CREATE OR REPLACE FUNCTION public.ingredient_for_recipe_ingredient(search recipe_ingredients)
 RETURNS SETOF ingredients
 LANGUAGE sql
 STABLE
AS $function$
SELECT *
FROM ingredients WHERE name = search.name;

$function$;
