alter table "recipe"."source_provider" drop constraint "source_provider_name_url_key";
alter table "recipe"."source_provider" add constraint "source_provider_name_key" unique ("name");
