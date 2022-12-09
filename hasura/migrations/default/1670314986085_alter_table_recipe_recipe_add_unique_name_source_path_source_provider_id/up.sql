alter table "recipe"."recipe" add constraint "recipe_name_source_path_source_provider_id_key" unique ("name", "source_path", "source_provider_id");
