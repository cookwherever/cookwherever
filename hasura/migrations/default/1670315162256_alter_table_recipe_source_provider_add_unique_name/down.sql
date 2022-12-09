alter table "recipe"."source_provider" drop constraint "source_provider_name_key";
alter table "recipe"."source_provider" add constraint "source_provider_url_name_key" unique ("url", "name");
