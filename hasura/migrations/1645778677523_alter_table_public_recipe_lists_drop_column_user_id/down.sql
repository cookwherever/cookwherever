alter table "public"."recipe_lists" alter column "user_id" drop not null;
alter table "public"."recipe_lists" add column "user_id" int4;
