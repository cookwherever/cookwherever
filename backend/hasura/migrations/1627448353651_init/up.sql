-- start a transaction
BEGIN;

-- extensions
CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;

SET check_function_bodies = false;
CREATE TYPE public.food_data_type_enum AS ENUM (
    'branded_food',
    'sub_sample_food',
    'foundation_food',
    'sr_legacy_food',
    'sample_food',
    'agricultural_acquisition',
    'market_acquistion',
    'survey_fndds_food',
    'experimental_food'
);
CREATE TABLE public.food (
    fdc_id integer NOT NULL,
    data_type public.food_data_type_enum,
    description text,
    food_category_id integer,
    publication_date timestamp without time zone,
    description_tsv tsvector
);
CREATE TABLE public.recipe_ingredients (
    id integer NOT NULL,
    name text NOT NULL,
    amount real NOT NULL,
    units text NOT NULL,
    comment text,
    recipe_id integer NOT NULL,
    food_id integer
);
CREATE FUNCTION public.food_candidates_for_ingredient(search public.recipe_ingredients) RETURNS SETOF public.food
    LANGUAGE sql STABLE
    AS $$
SELECT *
FROM search_foods(search.name);
$$;
CREATE FUNCTION public.food_description_search_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
    new.tsv :=
                        setweight(to_tsvector(split_part(new.description, ',', 1)), 'A') ||
                        setweight(to_tsvector(split_part(new.description, ',', 2)), 'B') ||
                        setweight(to_tsvector(split_part(new.description, ',', 3)), 'C') ||
                        setweight(to_tsvector(split_part(new.description, ',', 4)), 'D');
    return new;
end
$$;
CREATE FUNCTION public.search_foods(search text) RETURNS SETOF public.food
    LANGUAGE sql STABLE
    AS $_$
SELECT f.*
FROM food f,
     trim(regexp_replace(regexp_replace(lower(search), '(unsalted|dark|light)', ''), 'eggs?$',
                         'egg whole')) search_prepped,
     websearch_to_tsquery('english', search_prepped) query,
     to_tsquery('english',
                'nfs | ns | nonfat | reduced | cooked | pickled | light | flavored | sweetened | with | without | ' ||
                'whipped | cereal | diet | confectioners:C') query_detractors,
     to_tsquery('english', 'raw | fresh | milkfat | spices:A | white:B | stick:B | tap:B') query_attractors
WHERE f.data_type IN ('survey_fndds_food', 'sr_legacy_food', 'foundation_food')
  AND f.description_tsv @@ query
ORDER BY 0
             + ts_rank(f.description_tsv, query)
             + ts_rank(f.description_tsv, query_attractors)
             - ts_rank(f.description_tsv, query_detractors)
             + (description ILIKE concat(search_prepped, ',%'))::int
             --+ (description ILIKE concat('Spices,%'))::int
    desc
$_$;
CREATE OR REPLACE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE TABLE public.acquisition_sample (
    fdc_id_of_sample_food integer,
    fdc_id_of_acquisition_food integer
);
CREATE TABLE public.agricultural_acquisition (
    fdc_id integer NOT NULL,
    acquisition_date timestamp without time zone,
    market_class character varying(510),
    treatment character varying(510),
    state character varying(510)
);
CREATE TABLE public.branded_food (
    fdc_id integer NOT NULL,
    brand_owner character varying(510),
    gtin_upc character varying(510),
    ingredients text,
    serving_size integer,
    serving_size_unit character varying(510),
    household_serving_fulltext character varying(510),
    branded_food_category character varying(510),
    data_source character varying(510),
    modified_date timestamp without time zone,
    available_date timestamp without time zone,
    market_country character varying(510),
    discontinued_date character varying(510)
);
CREATE TABLE public.fndds_derivation (
    derivation_code character varying(510) NOT NULL,
    derivation_description text
);
CREATE TABLE public.fndds_ingredient_nutrient_value (
    "ingredient code" integer,
    "Ingredient description" text,
    "Nutrient code" integer,
    "Nutrient value" double precision,
    "Nutrient value source" text,
    "FDC ID" integer,
    "Derivation code" character varying(510),
    "SR AddMod year" integer,
    "Foundation year acquired" integer,
    "Start date" timestamp without time zone,
    "End date" timestamp without time zone
);
CREATE TABLE public.food_attribute (
    id integer NOT NULL,
    fdc_id integer,
    seq_num integer,
    food_attribute_type_id integer,
    name character varying(510),
    value text
);
CREATE TABLE public.food_attribute_type (
    id integer NOT NULL,
    name character varying(510),
    description character varying(510)
);
CREATE TABLE public.food_calorie_conversion_factor (
    food_nutrient_conversion_factor_id integer NOT NULL,
    protein_value double precision,
    fat_value double precision,
    carbohydrate_value double precision
);
CREATE TABLE public.food_category (
    id integer NOT NULL,
    code integer,
    description text
);
CREATE TABLE public.food_component (
    id integer NOT NULL,
    fdc_id integer,
    name character varying(510),
    pct_weight double precision,
    is_refuse character varying(510),
    gram_weight double precision,
    data_points integer,
    min_year_acquired integer
);
CREATE TABLE public.food_nutrient (
    id integer NOT NULL,
    fdc_id integer,
    nutrient_id integer,
    amount double precision,
    data_points integer,
    derivation_id integer,
    min double precision,
    max double precision,
    median double precision,
    footnote character varying(510),
    min_year_acquired integer
);
CREATE TABLE public.food_nutrient_conversion_factor (
    id integer NOT NULL,
    fdc_id integer
);
CREATE TABLE public.food_nutrient_derivation (
    id integer NOT NULL,
    code character varying(510),
    description text,
    source_id character varying(510)
);
CREATE TABLE public.food_nutrient_source (
    id integer NOT NULL,
    code integer,
    description text
);
CREATE TABLE public.food_portion (
    id integer NOT NULL,
    fdc_id integer,
    seq_num integer,
    amount double precision,
    measure_unit_id integer,
    portion_description character varying(510),
    modifier character varying(510),
    gram_weight double precision,
    data_points integer,
    footnote character varying(510),
    min_year_acquired integer
);
CREATE TABLE public.food_protein_conversion_factor (
    food_nutrient_conversion_factor_id integer NOT NULL,
    value double precision
);
CREATE TABLE public.food_update_log_entry (
    id integer NOT NULL,
    description text,
    last_updated timestamp without time zone
);
CREATE TABLE public.foundation_food (
    fdc_id integer NOT NULL,
    "NDB_number" integer,
    footnote text
);
CREATE TABLE public.input_food (
    id integer NOT NULL,
    fdc_id integer,
    fdc_id_of_input_food integer,
    seq_num integer,
    amount double precision,
    sr_code integer,
    sr_description text,
    unit character varying(510),
    portion_code integer,
    portion_description character varying(510),
    gram_weight double precision,
    retention_code integer,
    survey_flag character varying(510)
);
CREATE TABLE public.lab_method (
    id integer NOT NULL,
    description text,
    technique text
);
CREATE TABLE public.lab_method_code (
    id integer NOT NULL,
    lab_method_id integer,
    code character varying(510)
);
CREATE TABLE public.lab_method_nutrient (
    id integer NOT NULL,
    lab_method_id integer,
    nutrient_id integer
);
CREATE TABLE public.market_acquisition (
    fdc_id integer NOT NULL,
    brand_description character varying(510),
    expiration_date timestamp without time zone,
    label_weight character varying(510),
    location character varying(510),
    acquisition_date timestamp without time zone,
    sales_type character varying(510),
    sample_lot_nbr character varying(510),
    sell_by_date timestamp without time zone,
    store_city character varying(510),
    store_name character varying(510),
    store_state character varying(510),
    upc_code character varying(510)
);
CREATE TABLE public.measure_unit (
    id integer NOT NULL,
    name character varying(510),
    ml double precision
);
CREATE TABLE public.nutrient (
    id integer NOT NULL,
    name character varying(510),
    unit_name character varying(510),
    nutrient_nbr integer,
    rank integer
);
CREATE TABLE public.nutrient_incoming_name (
    id integer NOT NULL,
    name character varying(510),
    nutrient_id integer
);
CREATE TABLE public.queues (
    id integer NOT NULL,
    name text NOT NULL
);
CREATE SEQUENCE public.queues_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.queues_id_seq OWNED BY public.queues.id;
CREATE TABLE public.recipe_direction_durations (
    id integer NOT NULL,
    type text NOT NULL,
    duration integer NOT NULL,
    unit_of_time text NOT NULL,
    seq_num integer NOT NULL,
    recipe_id integer NOT NULL
);
CREATE SEQUENCE public.recipe_direction_durations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.recipe_direction_durations_id_seq OWNED BY public.recipe_direction_durations.id;
CREATE TABLE public.recipe_directions (
    id integer NOT NULL,
    seq_num integer NOT NULL,
    direction text NOT NULL,
    recipe_id integer NOT NULL
);
CREATE SEQUENCE public.recipe_directions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.recipe_directions_id_seq OWNED BY public.recipe_directions.id;
CREATE SEQUENCE public.recipe_ingredients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.recipe_ingredients_id_seq OWNED BY public.recipe_ingredients.id;
CREATE TABLE public.recipe_queues (
    id integer NOT NULL,
    recipe_id integer NOT NULL,
    queue_id integer NOT NULL,
    seq_num integer
);
CREATE SEQUENCE public.recipe_queues_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.recipe_queues_id_seq OWNED BY public.recipe_queues.id;
CREATE TABLE public.recipe_tags (
    id integer NOT NULL,
    name text NOT NULL,
    recipe_id integer NOT NULL
);
CREATE SEQUENCE public.recipe_tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.recipe_tags_id_seq OWNED BY public.recipe_tags.id;
CREATE TABLE public.recipes (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    name text NOT NULL,
    source text NOT NULL,
    image text,
    extraction_metadata jsonb
);
CREATE SEQUENCE public.recipes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.recipes_id_seq OWNED BY public.recipes.id;
CREATE TABLE public.retention_factor (
    id integer NOT NULL,
    code integer,
    food_group_id integer,
    description character varying(510)
);
CREATE TABLE public.sample_food (
    fdc_id integer
);
CREATE TABLE public.sr_legacy_food (
    fdc_id integer NOT NULL,
    "NDB_number" integer
);
CREATE TABLE public.sub_sample_food (
    fdc_id integer NOT NULL,
    fdc_id_of_sample_food integer
);
CREATE TABLE public.sub_sample_result (
    food_nutrient_id integer NOT NULL,
    adjusted_amount double precision,
    lab_method_id integer,
    nutrient_name character varying(510)
);
CREATE TABLE public.survey_fndds_food (
    fdc_id integer NOT NULL,
    food_code integer,
    wweia_category_code integer,
    start_date timestamp without time zone,
    end_date timestamp without time zone
);
CREATE TABLE public.wweia_food_category (
    wweia_food_category integer NOT NULL,
    wweia_food_category_description text
);
CREATE TABLE public."~TMPCLP348741" (
    "ID" integer NOT NULL,
    data_type character varying(510),
    description character varying(510),
    food_category_id integer,
    publication_date timestamp without time zone
);
CREATE SEQUENCE public."~TMPCLP348741_ID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."~TMPCLP348741_ID_seq" OWNED BY public."~TMPCLP348741"."ID";
ALTER TABLE ONLY public.queues ALTER COLUMN id SET DEFAULT nextval('public.queues_id_seq'::regclass);
ALTER TABLE ONLY public.recipe_direction_durations ALTER COLUMN id SET DEFAULT nextval('public.recipe_direction_durations_id_seq'::regclass);
ALTER TABLE ONLY public.recipe_directions ALTER COLUMN id SET DEFAULT nextval('public.recipe_directions_id_seq'::regclass);
ALTER TABLE ONLY public.recipe_ingredients ALTER COLUMN id SET DEFAULT nextval('public.recipe_ingredients_id_seq'::regclass);
ALTER TABLE ONLY public.recipe_queues ALTER COLUMN id SET DEFAULT nextval('public.recipe_queues_id_seq'::regclass);
ALTER TABLE ONLY public.recipe_tags ALTER COLUMN id SET DEFAULT nextval('public.recipe_tags_id_seq'::regclass);
ALTER TABLE ONLY public.recipes ALTER COLUMN id SET DEFAULT nextval('public.recipes_id_seq'::regclass);
ALTER TABLE ONLY public."~TMPCLP348741" ALTER COLUMN "ID" SET DEFAULT nextval('public."~TMPCLP348741_ID_seq"'::regclass);
ALTER TABLE ONLY public.agricultural_acquisition
    ADD CONSTRAINT agricultural_acquisition_pkey PRIMARY KEY (fdc_id);
ALTER TABLE ONLY public.branded_food
    ADD CONSTRAINT branded_food_pkey PRIMARY KEY (fdc_id);
ALTER TABLE ONLY public.fndds_derivation
    ADD CONSTRAINT fndds_derivation_pkey PRIMARY KEY (derivation_code);
ALTER TABLE ONLY public.food_attribute
    ADD CONSTRAINT food_attribute_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.food_attribute_type
    ADD CONSTRAINT food_attribute_type_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.food_calorie_conversion_factor
    ADD CONSTRAINT food_calorie_conversion_factor_pkey PRIMARY KEY (food_nutrient_conversion_factor_id);
ALTER TABLE ONLY public.food_category
    ADD CONSTRAINT food_category_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.food_component
    ADD CONSTRAINT food_component_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.food_nutrient_conversion_factor
    ADD CONSTRAINT food_nutrient_conversion_factor_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.food_nutrient_derivation
    ADD CONSTRAINT food_nutrient_derivation_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.food_nutrient
    ADD CONSTRAINT food_nutrient_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.food_nutrient_source
    ADD CONSTRAINT food_nutrient_source_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.food
    ADD CONSTRAINT food_pkey PRIMARY KEY (fdc_id);
ALTER TABLE ONLY public.food_portion
    ADD CONSTRAINT food_portion_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.food_protein_conversion_factor
    ADD CONSTRAINT food_protein_conversion_factor_pkey PRIMARY KEY (food_nutrient_conversion_factor_id);
ALTER TABLE ONLY public.food_update_log_entry
    ADD CONSTRAINT food_update_log_entry_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.foundation_food
    ADD CONSTRAINT foundation_food_pkey PRIMARY KEY (fdc_id);
ALTER TABLE ONLY public.input_food
    ADD CONSTRAINT input_food_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.lab_method_code
    ADD CONSTRAINT lab_method_code_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.lab_method_nutrient
    ADD CONSTRAINT lab_method_nutrient_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.lab_method
    ADD CONSTRAINT lab_method_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.market_acquisition
    ADD CONSTRAINT market_acquisition_pkey PRIMARY KEY (fdc_id);
ALTER TABLE ONLY public.measure_unit
    ADD CONSTRAINT measure_unit_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.nutrient_incoming_name
    ADD CONSTRAINT nutrient_incoming_name_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.nutrient
    ADD CONSTRAINT nutrient_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.queues
    ADD CONSTRAINT queues_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.recipe_direction_durations
    ADD CONSTRAINT recipe_direction_durations_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.recipe_directions
    ADD CONSTRAINT recipe_directions_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.recipe_ingredients
    ADD CONSTRAINT recipe_ingredients_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.recipe_queues
    ADD CONSTRAINT recipe_queues_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.recipe_tags
    ADD CONSTRAINT recipe_tags_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.retention_factor
    ADD CONSTRAINT retention_factor_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.sr_legacy_food
    ADD CONSTRAINT sr_legacy_food_pkey PRIMARY KEY (fdc_id);
ALTER TABLE ONLY public.sub_sample_food
    ADD CONSTRAINT sub_sample_food_pkey PRIMARY KEY (fdc_id);
ALTER TABLE ONLY public.sub_sample_result
    ADD CONSTRAINT sub_sample_result_pkey PRIMARY KEY (food_nutrient_id);
ALTER TABLE ONLY public.survey_fndds_food
    ADD CONSTRAINT survey_fndds_food_pkey PRIMARY KEY (fdc_id);
ALTER TABLE ONLY public.wweia_food_category
    ADD CONSTRAINT wweia_food_category_pkey PRIMARY KEY (wweia_food_category);
ALTER TABLE ONLY public."~TMPCLP348741"
    ADD CONSTRAINT "~TMPCLP348741_pkey" PRIMARY KEY ("ID");
CREATE INDEX "fndds_ingredient_nutrient_value_Derivation code_idx" ON public.fndds_ingredient_nutrient_value USING btree ("Derivation code");
CREATE INDEX "fndds_ingredient_nutrient_value_FDC ID_idx" ON public.fndds_ingredient_nutrient_value USING btree ("FDC ID");
CREATE INDEX "fndds_ingredient_nutrient_value_Nutrient code_idx" ON public.fndds_ingredient_nutrient_value USING btree ("Nutrient code");
CREATE INDEX food_attribute_fdc_id_idx ON public.food_attribute USING btree (fdc_id);
CREATE INDEX food_attribute_food_attribute_type_id_idx ON public.food_attribute USING btree (food_attribute_type_id);
CREATE INDEX food_attribute_seq_num_idx ON public.food_attribute USING btree (seq_num);
CREATE INDEX food_category_code_idx ON public.food_category USING btree (code);
CREATE INDEX food_component_fdc_id_idx ON public.food_component USING btree (fdc_id);
CREATE INDEX food_data_type ON public.food USING btree (data_type);
CREATE INDEX food_description_gin_idx ON public.food USING gin (to_tsvector('english'::regconfig, description));
CREATE INDEX food_description_tsv_gin_idx ON public.food USING gin (description_tsv);
CREATE INDEX food_food_category_id_idx ON public.food USING btree (food_category_id);
CREATE INDEX food_nutrient_conversion_factor_fdc_id_idx ON public.food_nutrient_conversion_factor USING btree (fdc_id);
CREATE INDEX food_nutrient_derivation_code_idx ON public.food_nutrient_derivation USING btree (code);
CREATE INDEX food_nutrient_derivation_id_idx ON public.food_nutrient USING btree (derivation_id);
CREATE INDEX food_nutrient_derivation_source_id_idx ON public.food_nutrient_derivation USING btree (source_id);
CREATE INDEX food_nutrient_fdc_id_idx ON public.food_nutrient USING btree (fdc_id);
CREATE INDEX food_nutrient_nutrient_id_idx ON public.food_nutrient USING btree (nutrient_id);
CREATE INDEX food_nutrient_source_code_idx ON public.food_nutrient_source USING btree (code);
CREATE INDEX food_portion_fdc_id_idx ON public.food_portion USING btree (fdc_id);
CREATE INDEX food_portion_measure_unit_id_idx ON public.food_portion USING btree (measure_unit_id);
CREATE INDEX food_portion_seq_num_idx ON public.food_portion USING btree (seq_num);
CREATE INDEX input_food_fdc_id_idx ON public.input_food USING btree (fdc_id);
CREATE INDEX input_food_portion_code_idx ON public.input_food USING btree (portion_code);
CREATE INDEX input_food_retention_code_idx ON public.input_food USING btree (retention_code);
CREATE INDEX input_food_seq_num_idx ON public.input_food USING btree (seq_num);
CREATE INDEX input_food_sr_code_idx ON public.input_food USING btree (sr_code);
CREATE INDEX lab_method_code_code_idx ON public.lab_method_code USING btree (code);
CREATE INDEX lab_method_code_lab_method_id_idx ON public.lab_method_code USING btree (lab_method_id);
CREATE INDEX lab_method_nutrient_lab_method_id_idx ON public.lab_method_nutrient USING btree (lab_method_id);
CREATE INDEX lab_method_nutrient_nutrient_id_idx ON public.lab_method_nutrient USING btree (nutrient_id);
CREATE INDEX market_acquisition_upc_code_idx ON public.market_acquisition USING btree (upc_code);
CREATE INDEX nutrient_incoming_name_nutrient_id_idx ON public.nutrient_incoming_name USING btree (nutrient_id);
CREATE INDEX retention_factor_code_idx ON public.retention_factor USING btree (code);
CREATE INDEX retention_factor_food_group_id_idx ON public.retention_factor USING btree (food_group_id);
CREATE INDEX sub_sample_result_lab_method_id_idx ON public.sub_sample_result USING btree (lab_method_id);
CREATE INDEX survey_fndds_food_food_code_idx ON public.survey_fndds_food USING btree (food_code);
CREATE INDEX survey_fndds_food_wweia_category_code_idx ON public.survey_fndds_food USING btree (wweia_category_code);
CREATE INDEX "~TMPCLP348741_food_category_id_idx" ON public."~TMPCLP348741" USING btree (food_category_id);
CREATE TRIGGER set_public_recipes_updated_at BEFORE UPDATE ON public.recipes FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_recipes_updated_at ON public.recipes IS 'trigger to set value of column "updated_at" to current timestamp on row update';
ALTER TABLE ONLY public.agricultural_acquisition
    ADD CONSTRAINT agricultural_acquisition_fdc_id_fkey FOREIGN KEY (fdc_id) REFERENCES public.food(fdc_id);
ALTER TABLE ONLY public.branded_food
    ADD CONSTRAINT branded_food_fdc_id_fkey FOREIGN KEY (fdc_id) REFERENCES public.food(fdc_id);
ALTER TABLE ONLY public.food_attribute
    ADD CONSTRAINT food_attribute_fdc_id_fkey FOREIGN KEY (fdc_id) REFERENCES public.food(fdc_id);
ALTER TABLE ONLY public.food_attribute
    ADD CONSTRAINT food_attribute_food_attribute_type_id_fkey FOREIGN KEY (food_attribute_type_id) REFERENCES public.food_attribute_type(id);
ALTER TABLE ONLY public.food_component
    ADD CONSTRAINT food_component_fdc_id_fkey FOREIGN KEY (fdc_id) REFERENCES public.food(fdc_id);
ALTER TABLE ONLY public.food_nutrient
    ADD CONSTRAINT food_nutrient_nutrient_id_fkey FOREIGN KEY (nutrient_id) REFERENCES public.nutrient(id);
ALTER TABLE ONLY public.food_portion
    ADD CONSTRAINT food_portion_fdc_id_fkey FOREIGN KEY (fdc_id) REFERENCES public.food(fdc_id);
ALTER TABLE ONLY public.food_portion
    ADD CONSTRAINT food_portion_measure_unit_id_fkey FOREIGN KEY (measure_unit_id) REFERENCES public.measure_unit(id);
ALTER TABLE ONLY public.foundation_food
    ADD CONSTRAINT foundation_food_fdc_id_fkey FOREIGN KEY (fdc_id) REFERENCES public.food(fdc_id);
ALTER TABLE ONLY public.input_food
    ADD CONSTRAINT input_food_fdc_id_fkey FOREIGN KEY (fdc_id) REFERENCES public.food(fdc_id);
ALTER TABLE ONLY public.input_food
    ADD CONSTRAINT input_food_fdc_id_of_input_food_fkey FOREIGN KEY (fdc_id_of_input_food) REFERENCES public.food(fdc_id);
ALTER TABLE ONLY public.lab_method_code
    ADD CONSTRAINT lab_method_code_lab_method_id_fkey FOREIGN KEY (lab_method_id) REFERENCES public.lab_method(id);
ALTER TABLE ONLY public.lab_method_nutrient
    ADD CONSTRAINT lab_method_nutrient_lab_method_id_fkey FOREIGN KEY (lab_method_id) REFERENCES public.lab_method(id);
ALTER TABLE ONLY public.nutrient_incoming_name
    ADD CONSTRAINT nutrient_incoming_name_nutrient_id_fkey FOREIGN KEY (nutrient_id) REFERENCES public.nutrient(id);
ALTER TABLE ONLY public.recipe_direction_durations
    ADD CONSTRAINT recipe_direction_durations_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.recipe_directions
    ADD CONSTRAINT recipe_directions_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.recipe_ingredients
    ADD CONSTRAINT recipe_ingredients_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.recipe_queues
    ADD CONSTRAINT recipe_queues_queue_id_fkey FOREIGN KEY (queue_id) REFERENCES public.queues(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.recipe_queues
    ADD CONSTRAINT recipe_queues_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.recipe_tags
    ADD CONSTRAINT recipe_tags_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.sr_legacy_food
    ADD CONSTRAINT sr_legacy_food_fdc_id_fkey FOREIGN KEY (fdc_id) REFERENCES public.food(fdc_id);
ALTER TABLE ONLY public.sub_sample_result
    ADD CONSTRAINT sub_sample_result_lab_method_id_fkey FOREIGN KEY (lab_method_id) REFERENCES public.lab_method(id);
ALTER TABLE ONLY public.survey_fndds_food
    ADD CONSTRAINT survey_fndds_food_fdc_id_fkey FOREIGN KEY (fdc_id) REFERENCES public.food(fdc_id);

-- commit the change (or roll it back later)
COMMIT;
