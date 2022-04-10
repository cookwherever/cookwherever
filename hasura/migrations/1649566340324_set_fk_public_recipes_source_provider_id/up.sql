alter table "public"."recipes"
  add constraint "recipes_source_provider_id_fkey"
  foreign key ("source_provider_id")
  references "public"."recipe_source_providers"
  ("id") on update no action on delete no action;
