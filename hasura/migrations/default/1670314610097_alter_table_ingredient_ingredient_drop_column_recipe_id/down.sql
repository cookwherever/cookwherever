alter table "ingredient"."ingredient"
  add constraint "ingredient_recipe_id_fkey"
  foreign key (recipe_id)
  references "recipe"."recipe"
  (id) on update no action on delete no action;
alter table "ingredient"."ingredient" alter column "recipe_id" drop not null;
alter table "ingredient"."ingredient" add column "recipe_id" uuid;
