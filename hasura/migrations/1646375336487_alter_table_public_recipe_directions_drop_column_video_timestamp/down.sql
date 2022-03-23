alter table "public"."recipe_directions" alter column "video_timestamp" drop not null;
alter table "public"."recipe_directions" add column "video_timestamp" text;
