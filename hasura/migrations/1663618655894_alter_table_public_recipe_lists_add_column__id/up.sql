CREATE EXTENSION IF NOT EXISTS pgcrypto;
alter table "public"."recipe_lists" add column "_id" uuid
 not null default gen_random_uuid();
