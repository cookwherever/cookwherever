alter table "recipe"."source_provider" add constraint "source_provider_name_url_key" unique ("name", "url");
