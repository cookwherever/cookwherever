alter table "recipe"."direction" drop constraint "direction_recipe_id_seq_key";
alter table "recipe"."direction" add constraint "direction_seq_key" unique ("seq");
