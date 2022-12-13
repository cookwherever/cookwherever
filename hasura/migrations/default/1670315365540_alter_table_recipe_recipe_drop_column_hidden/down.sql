alter table "recipe"."recipe" alter column "hidden" set default false;
alter table "recipe"."recipe" alter column "hidden" drop not null;
alter table "recipe"."recipe" add column "hidden" bool;
