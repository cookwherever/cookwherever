alter table "recipe"."ingredient" add constraint "ingredient_recipe_id_seq_key" unique ("recipe_id", "seq");
