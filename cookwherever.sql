CREATE SCHEMA "recipe";

CREATE SCHEMA "equipment";

CREATE SCHEMA "ingredient";

CREATE SCHEMA "food";

CREATE TABLE "recipe"."recipe" (
  "id" UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  "created_at" timestamp DEFAULT (now()),
  "creator_id" UUID NOT NULL,
  "updated_at" timestamp DEFAULT (now()),
  "parent_id" UUID,
  "name" text NOT NULL,
  "slug" text NOT NULL,
  "hidden" boolean DEFAULT false,
  "image" text,
  "video" text,
  "extraction_metadata" jsonb,
  "source_provider_id" UUID,
  "source_path" text
);

CREATE TABLE "recipe"."source_provider" (
  "id" UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  "name" text,
  "url" text,
  "description" text
);

CREATE TABLE "recipe"."list" (
  "id" UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  "name" text,
  "user_id" UUID
);

CREATE TABLE "recipe"."list_item" (
  "id" UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  "seq" int NOT NULL,
  "list_id" UUID,
  "recipe_id" UUID
);

CREATE TABLE "recipe"."ingredient" (
  "id" UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  "recipe_id" UUID,
  "ingredient_id" UUID,
  "seq" int,
  "text" text,
  "amount" int,
  "unit_id" UUID,
  "name" text,
  "comment" text,
  "video_timestamp_id" UUID
);

CREATE TABLE "recipe"."direction" (
  "id" UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  "seq" int,
  "text" text,
  "action" text,
  "recipe_id" UUID,
  "video_timestamp_id" UUID
);

CREATE TABLE "recipe"."direction_ingredient" (
  "id" UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  "direction_id" UUID,
  "ingredient_id" UUID
);

CREATE TABLE "recipe"."direction_equipment" (
  "id" UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  "direction_id" UUID,
  "equipment_id" UUID
);

CREATE TABLE "recipe"."video_timestamp" (
  "id" UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  "start" int,
  "end" int
);

CREATE TABLE "recipe"."equipment" (
  "id" UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  "recipe_id" UUID,
  "equipment_id" UUID
);

CREATE TABLE "equipment"."equipment" (
  "id" UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  "name" text
);

CREATE TABLE "equipment"."config" (
  "id" UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  "equipment_id" UUID,
  "config" jsonb
);

CREATE TABLE "ingredient"."ingredient" (
  "id" UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  "wiki_url" text,
  "food_id" UUID,
  "recipe_id" UUID
);

CREATE TABLE "ingredient"."name" (
  "id" UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  "name" text,
  "ingredient_id" UUID
);

CREATE TABLE "food"."food" (
  "id" UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  "fdc_id" int
);

CREATE TABLE "food"."food_measurement" (
  "id" UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  "food_id" UUID,
  "measurement_id" UUID
);

CREATE TABLE "food"."measurement" (
  "id" UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  "amount" int,
  "unit_id" UUID,
  "mass" int
);

CREATE TABLE "food"."unit" (
  "id" UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  "name" text,
  "gram_coefficient" int
);

COMMENT ON COLUMN "recipe"."recipe"."creator_id" IS 'User who created the recipe.';

ALTER TABLE "recipe"."recipe" ADD FOREIGN KEY ("parent_id") REFERENCES "recipe"."recipe" ("id");

ALTER TABLE "recipe"."recipe" ADD FOREIGN KEY ("source_provider_id") REFERENCES "recipe"."source_provider" ("id");

ALTER TABLE "recipe"."list_item" ADD FOREIGN KEY ("list_id") REFERENCES "recipe"."list" ("id");

ALTER TABLE "recipe"."list_item" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipe"."recipe" ("id");

ALTER TABLE "recipe"."ingredient" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipe"."recipe" ("id");

ALTER TABLE "recipe"."ingredient" ADD FOREIGN KEY ("ingredient_id") REFERENCES "ingredient"."ingredient" ("id");

ALTER TABLE "recipe"."ingredient" ADD FOREIGN KEY ("unit_id") REFERENCES "food"."unit" ("id");

ALTER TABLE "recipe"."ingredient" ADD FOREIGN KEY ("video_timestamp_id") REFERENCES "recipe"."video_timestamp" ("id");

ALTER TABLE "recipe"."direction" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipe"."recipe" ("id");

ALTER TABLE "recipe"."direction" ADD FOREIGN KEY ("video_timestamp_id") REFERENCES "recipe"."video_timestamp" ("id");

ALTER TABLE "recipe"."direction_ingredient" ADD FOREIGN KEY ("direction_id") REFERENCES "recipe"."direction" ("id");

ALTER TABLE "recipe"."direction_ingredient" ADD FOREIGN KEY ("ingredient_id") REFERENCES "ingredient"."ingredient" ("id");

ALTER TABLE "recipe"."direction_equipment" ADD FOREIGN KEY ("direction_id") REFERENCES "recipe"."direction" ("id");

ALTER TABLE "recipe"."direction_equipment" ADD FOREIGN KEY ("equipment_id") REFERENCES "recipe"."equipment" ("id");

ALTER TABLE "recipe"."equipment" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipe"."recipe" ("id");

ALTER TABLE "recipe"."equipment" ADD FOREIGN KEY ("equipment_id") REFERENCES "equipment"."equipment" ("id");

ALTER TABLE "equipment"."config" ADD FOREIGN KEY ("equipment_id") REFERENCES "equipment"."equipment" ("id");

ALTER TABLE "ingredient"."ingredient" ADD FOREIGN KEY ("food_id") REFERENCES "food"."food" ("id");

ALTER TABLE "ingredient"."ingredient" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipe"."recipe" ("id");

ALTER TABLE "ingredient"."name" ADD FOREIGN KEY ("ingredient_id") REFERENCES "ingredient"."ingredient" ("id");

ALTER TABLE "food"."food_measurement" ADD FOREIGN KEY ("food_id") REFERENCES "food"."food" ("id");

ALTER TABLE "food"."food_measurement" ADD FOREIGN KEY ("measurement_id") REFERENCES "food"."measurement" ("id");

ALTER TABLE "food"."measurement" ADD FOREIGN KEY ("unit_id") REFERENCES "food"."unit" ("id");
