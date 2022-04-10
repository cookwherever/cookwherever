comment on column "public"."recipe_source_providers"."enum_id" is E'Sources from where recipes come from.';
alter table "public"."recipe_source_providers" alter column "enum_id" drop not null;
alter table "public"."recipe_source_providers" add column "enum_id" int4;
