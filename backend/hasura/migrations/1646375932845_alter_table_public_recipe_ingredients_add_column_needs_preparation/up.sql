alter table "public"."recipe_ingredients" add column "needs_preparation" boolean
 not null default 'false';
