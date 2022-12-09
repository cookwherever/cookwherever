alter table "recipe"."recipe" alter column "slug" drop not null;
alter table "recipe"."recipe" add column "slug" text;
