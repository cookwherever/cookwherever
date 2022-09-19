alter table "public"."recipe_lists" alter column "_id" set default gen_random_uuid();
alter table "public"."recipe_lists" alter column "_id" drop not null;
alter table "public"."recipe_lists" add column "_id" uuid;
