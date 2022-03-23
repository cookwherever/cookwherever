alter table "public"."recipe_ingredients" alter column "needs_preparation" set default false;
alter table "public"."recipe_ingredients" alter column "needs_preparation" drop not null;
alter table "public"."recipe_ingredients" add column "needs_preparation" bool;
