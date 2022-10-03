alter table "public"."recipe_lists"
  add constraint "recipe_lists_user_id_fkey"
  foreign key ("user_id")
  references "public"."identities"
  ("id") on update cascade on delete cascade;
