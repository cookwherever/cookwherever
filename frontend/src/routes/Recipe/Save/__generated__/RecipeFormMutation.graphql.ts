/**
 * @generated SignedSource<<4b37a46baa572aad4d5ba7d3953cf930>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type EquipmentConfigConstraint = "config_pkey" | "%future added value";
export type EquipmentConfigSelectColumn = "config" | "equipmentId" | "id" | "%future added value";
export type EquipmentConfigUpdateColumn = "config" | "equipmentId" | "id" | "%future added value";
export type EquipmentEquipmentConstraint = "equipment_pkey" | "%future added value";
export type EquipmentEquipmentUpdateColumn = "id" | "name" | "%future added value";
export type FoodUnitConstraint = "unit_pkey" | "%future added value";
export type FoodUnitUpdateColumn = "gramCoefficient" | "id" | "name" | "%future added value";
export type IngredientIngredientConstraint = "ingredient_pkey" | "%future added value";
export type IngredientIngredientUpdateColumn = "foodId" | "id" | "wikiUrl" | "%future added value";
export type RecipeDirectionConstraint = "direction_pkey" | "direction_recipe_id_seq_key" | "%future added value";
export type RecipeDirectionEquipmentConstraint = "direction_equipment_pkey" | "%future added value";
export type RecipeDirectionEquipmentSelectColumn = "directionId" | "equipmentId" | "id" | "%future added value";
export type RecipeDirectionEquipmentUpdateColumn = "directionId" | "equipmentId" | "id" | "%future added value";
export type RecipeDirectionIngredientConstraint = "direction_ingredient_pkey" | "%future added value";
export type RecipeDirectionIngredientSelectColumn = "directionId" | "id" | "ingredientId" | "%future added value";
export type RecipeDirectionIngredientUpdateColumn = "directionId" | "id" | "ingredientId" | "%future added value";
export type RecipeDirectionSelectColumn = "action" | "id" | "recipeId" | "seq" | "text" | "videoTimestampId" | "%future added value";
export type RecipeDirectionUpdateColumn = "action" | "id" | "recipeId" | "seq" | "text" | "videoTimestampId" | "%future added value";
export type RecipeEquipmentConstraint = "equipment_pkey" | "%future added value";
export type RecipeEquipmentSelectColumn = "equipmentId" | "id" | "recipeId" | "%future added value";
export type RecipeEquipmentUpdateColumn = "equipmentId" | "id" | "recipeId" | "%future added value";
export type RecipeIngredientConstraint = "ingredient_pkey" | "ingredient_recipe_id_seq_key" | "%future added value";
export type RecipeIngredientSelectColumn = "amount" | "comment" | "id" | "ingredientId" | "name" | "recipeId" | "seq" | "text" | "unitId" | "videoTimestampId" | "%future added value";
export type RecipeIngredientUpdateColumn = "amount" | "comment" | "id" | "ingredientId" | "name" | "recipeId" | "seq" | "text" | "unitId" | "videoTimestampId" | "%future added value";
export type RecipeRecipeConstraint = "recipe_name_source_path_source_provider_id_key" | "recipe_pkey" | "%future added value";
export type RecipeRecipeSelectColumn = "createdAt" | "creatorId" | "extractionMetadata" | "id" | "imageUrl" | "name" | "parentId" | "sourcePath" | "sourceProviderId" | "updatedAt" | "videoUrl" | "%future added value";
export type RecipeRecipeUpdateColumn = "createdAt" | "creatorId" | "extractionMetadata" | "id" | "imageUrl" | "name" | "parentId" | "sourcePath" | "sourceProviderId" | "updatedAt" | "videoUrl" | "%future added value";
export type RecipeSourceProviderConstraint = "source_provider_name_key" | "source_provider_pkey" | "%future added value";
export type RecipeSourceProviderUpdateColumn = "description" | "id" | "name" | "url" | "%future added value";
export type RecipeTagsConstraint = "tags_pkey" | "tags_recipe_id_name_key" | "%future added value";
export type RecipeTagsSelectColumn = "id" | "name" | "recipeId" | "seq" | "%future added value";
export type RecipeTagsUpdateColumn = "id" | "name" | "recipeId" | "seq" | "%future added value";
export type RecipeVideoTimestampConstraint = "video_timestamp_pkey" | "%future added value";
export type RecipeVideoTimestampUpdateColumn = "end" | "id" | "start" | "%future added value";
export type RecipeRecipeInsertInput = {
  createdAt?: any | null;
  creatorId?: any | null;
  directions?: RecipeDirectionArrRelInsertInput | null;
  equipment?: RecipeEquipmentArrRelInsertInput | null;
  extractionMetadata?: any | null;
  id?: any | null;
  imageUrl?: string | null;
  ingredients?: RecipeIngredientArrRelInsertInput | null;
  name?: string | null;
  parent?: RecipeRecipeObjRelInsertInput | null;
  parentId?: any | null;
  sourcePath?: string | null;
  sourceProviderId?: any | null;
  source_provider?: RecipeSourceProviderObjRelInsertInput | null;
  tags?: RecipeTagsArrRelInsertInput | null;
  updatedAt?: any | null;
  videoUrl?: string | null;
};
export type RecipeDirectionArrRelInsertInput = {
  data: ReadonlyArray<RecipeDirectionInsertInput>;
  onConflict?: RecipeDirectionOnConflict | null;
};
export type RecipeDirectionInsertInput = {
  action?: string | null;
  equipment?: RecipeDirectionEquipmentArrRelInsertInput | null;
  id?: any | null;
  ingredients?: RecipeDirectionIngredientArrRelInsertInput | null;
  recipe?: RecipeRecipeObjRelInsertInput | null;
  recipeId?: any | null;
  seq?: number | null;
  text?: string | null;
  videoTimestampId?: any | null;
  video_timestamp?: RecipeVideoTimestampObjRelInsertInput | null;
};
export type RecipeDirectionEquipmentArrRelInsertInput = {
  data: ReadonlyArray<RecipeDirectionEquipmentInsertInput>;
  onConflict?: RecipeDirectionEquipmentOnConflict | null;
};
export type RecipeDirectionEquipmentInsertInput = {
  direction?: RecipeDirectionObjRelInsertInput | null;
  directionId?: any | null;
  equipment?: RecipeEquipmentObjRelInsertInput | null;
  equipmentId?: any | null;
  id?: any | null;
};
export type RecipeDirectionObjRelInsertInput = {
  data: RecipeDirectionInsertInput;
  onConflict?: RecipeDirectionOnConflict | null;
};
export type RecipeDirectionOnConflict = {
  constraint: RecipeDirectionConstraint;
  update_columns: ReadonlyArray<RecipeDirectionUpdateColumn>;
  where?: RecipeDirectionBoolExp | null;
};
export type RecipeDirectionBoolExp = {
  _and?: ReadonlyArray<RecipeDirectionBoolExp> | null;
  _not?: RecipeDirectionBoolExp | null;
  _or?: ReadonlyArray<RecipeDirectionBoolExp> | null;
  action?: StringComparisonExp | null;
  equipment?: RecipeDirectionEquipmentBoolExp | null;
  equipment_aggregate?: recipe_direction_equipment_aggregate_bool_exp | null;
  id?: UuidComparisonExp | null;
  ingredients?: RecipeDirectionIngredientBoolExp | null;
  ingredients_aggregate?: recipe_direction_ingredient_aggregate_bool_exp | null;
  recipe?: RecipeRecipeBoolExp | null;
  recipeId?: UuidComparisonExp | null;
  seq?: IntComparisonExp | null;
  text?: StringComparisonExp | null;
  videoTimestampId?: UuidComparisonExp | null;
  video_timestamp?: RecipeVideoTimestampBoolExp | null;
};
export type StringComparisonExp = {
  _eq?: string | null;
  _gt?: string | null;
  _gte?: string | null;
  _ilike?: string | null;
  _in?: ReadonlyArray<string> | null;
  _iregex?: string | null;
  _isNull?: boolean | null;
  _like?: string | null;
  _lt?: string | null;
  _lte?: string | null;
  _neq?: string | null;
  _nilike?: string | null;
  _nin?: ReadonlyArray<string> | null;
  _niregex?: string | null;
  _nlike?: string | null;
  _nregex?: string | null;
  _nsimilar?: string | null;
  _regex?: string | null;
  _similar?: string | null;
};
export type RecipeDirectionEquipmentBoolExp = {
  _and?: ReadonlyArray<RecipeDirectionEquipmentBoolExp> | null;
  _not?: RecipeDirectionEquipmentBoolExp | null;
  _or?: ReadonlyArray<RecipeDirectionEquipmentBoolExp> | null;
  direction?: RecipeDirectionBoolExp | null;
  directionId?: UuidComparisonExp | null;
  equipment?: RecipeEquipmentBoolExp | null;
  equipmentId?: UuidComparisonExp | null;
  id?: UuidComparisonExp | null;
};
export type UuidComparisonExp = {
  _eq?: any | null;
  _gt?: any | null;
  _gte?: any | null;
  _in?: ReadonlyArray<any> | null;
  _isNull?: boolean | null;
  _lt?: any | null;
  _lte?: any | null;
  _neq?: any | null;
  _nin?: ReadonlyArray<any> | null;
};
export type RecipeEquipmentBoolExp = {
  _and?: ReadonlyArray<RecipeEquipmentBoolExp> | null;
  _not?: RecipeEquipmentBoolExp | null;
  _or?: ReadonlyArray<RecipeEquipmentBoolExp> | null;
  equipment?: EquipmentEquipmentBoolExp | null;
  equipmentId?: UuidComparisonExp | null;
  id?: UuidComparisonExp | null;
  recipe?: RecipeRecipeBoolExp | null;
  recipeId?: UuidComparisonExp | null;
};
export type EquipmentEquipmentBoolExp = {
  _and?: ReadonlyArray<EquipmentEquipmentBoolExp> | null;
  _not?: EquipmentEquipmentBoolExp | null;
  _or?: ReadonlyArray<EquipmentEquipmentBoolExp> | null;
  configs?: EquipmentConfigBoolExp | null;
  configs_aggregate?: equipment_config_aggregate_bool_exp | null;
  equipment?: RecipeEquipmentBoolExp | null;
  equipment_aggregate?: recipe_equipment_aggregate_bool_exp | null;
  id?: UuidComparisonExp | null;
  name?: StringComparisonExp | null;
};
export type EquipmentConfigBoolExp = {
  _and?: ReadonlyArray<EquipmentConfigBoolExp> | null;
  _not?: EquipmentConfigBoolExp | null;
  _or?: ReadonlyArray<EquipmentConfigBoolExp> | null;
  config?: JsonbComparisonExp | null;
  equipment?: EquipmentEquipmentBoolExp | null;
  equipmentId?: UuidComparisonExp | null;
  id?: UuidComparisonExp | null;
};
export type JsonbComparisonExp = {
  _cast?: JsonbCastExp | null;
  _containedIn?: any | null;
  _contains?: any | null;
  _eq?: any | null;
  _gt?: any | null;
  _gte?: any | null;
  _hasKey?: string | null;
  _hasKeysAll?: ReadonlyArray<string> | null;
  _hasKeysAny?: ReadonlyArray<string> | null;
  _in?: ReadonlyArray<any> | null;
  _isNull?: boolean | null;
  _lt?: any | null;
  _lte?: any | null;
  _neq?: any | null;
  _nin?: ReadonlyArray<any> | null;
};
export type JsonbCastExp = {
  String?: StringComparisonExp | null;
};
export type equipment_config_aggregate_bool_exp = {
  count?: equipment_config_aggregate_bool_exp_count | null;
};
export type equipment_config_aggregate_bool_exp_count = {
  arguments?: ReadonlyArray<EquipmentConfigSelectColumn> | null;
  distinct?: boolean | null;
  filter?: EquipmentConfigBoolExp | null;
  predicate: IntComparisonExp;
};
export type IntComparisonExp = {
  _eq?: number | null;
  _gt?: number | null;
  _gte?: number | null;
  _in?: ReadonlyArray<number> | null;
  _isNull?: boolean | null;
  _lt?: number | null;
  _lte?: number | null;
  _neq?: number | null;
  _nin?: ReadonlyArray<number> | null;
};
export type recipe_equipment_aggregate_bool_exp = {
  count?: recipe_equipment_aggregate_bool_exp_count | null;
};
export type recipe_equipment_aggregate_bool_exp_count = {
  arguments?: ReadonlyArray<RecipeEquipmentSelectColumn> | null;
  distinct?: boolean | null;
  filter?: RecipeEquipmentBoolExp | null;
  predicate: IntComparisonExp;
};
export type RecipeRecipeBoolExp = {
  _and?: ReadonlyArray<RecipeRecipeBoolExp> | null;
  _not?: RecipeRecipeBoolExp | null;
  _or?: ReadonlyArray<RecipeRecipeBoolExp> | null;
  createdAt?: TimestampComparisonExp | null;
  creatorId?: UuidComparisonExp | null;
  directions?: RecipeDirectionBoolExp | null;
  directions_aggregate?: recipe_direction_aggregate_bool_exp | null;
  equipment?: RecipeEquipmentBoolExp | null;
  equipment_aggregate?: recipe_equipment_aggregate_bool_exp | null;
  extractionMetadata?: JsonbComparisonExp | null;
  id?: UuidComparisonExp | null;
  imageUrl?: StringComparisonExp | null;
  ingredients?: RecipeIngredientBoolExp | null;
  ingredients_aggregate?: recipe_ingredient_aggregate_bool_exp | null;
  name?: StringComparisonExp | null;
  parent?: RecipeRecipeBoolExp | null;
  parentId?: UuidComparisonExp | null;
  sourcePath?: StringComparisonExp | null;
  sourceProviderId?: UuidComparisonExp | null;
  source_provider?: RecipeSourceProviderBoolExp | null;
  tags?: RecipeTagsBoolExp | null;
  tags_aggregate?: recipe_tags_aggregate_bool_exp | null;
  updatedAt?: TimestampComparisonExp | null;
  videoUrl?: StringComparisonExp | null;
};
export type TimestampComparisonExp = {
  _eq?: any | null;
  _gt?: any | null;
  _gte?: any | null;
  _in?: ReadonlyArray<any> | null;
  _isNull?: boolean | null;
  _lt?: any | null;
  _lte?: any | null;
  _neq?: any | null;
  _nin?: ReadonlyArray<any> | null;
};
export type recipe_direction_aggregate_bool_exp = {
  count?: recipe_direction_aggregate_bool_exp_count | null;
};
export type recipe_direction_aggregate_bool_exp_count = {
  arguments?: ReadonlyArray<RecipeDirectionSelectColumn> | null;
  distinct?: boolean | null;
  filter?: RecipeDirectionBoolExp | null;
  predicate: IntComparisonExp;
};
export type RecipeIngredientBoolExp = {
  _and?: ReadonlyArray<RecipeIngredientBoolExp> | null;
  _not?: RecipeIngredientBoolExp | null;
  _or?: ReadonlyArray<RecipeIngredientBoolExp> | null;
  amount?: IntComparisonExp | null;
  comment?: StringComparisonExp | null;
  id?: UuidComparisonExp | null;
  ingredient?: IngredientIngredientBoolExp | null;
  ingredientId?: UuidComparisonExp | null;
  name?: StringComparisonExp | null;
  recipe?: RecipeRecipeBoolExp | null;
  recipeId?: UuidComparisonExp | null;
  seq?: IntComparisonExp | null;
  text?: StringComparisonExp | null;
  unit?: FoodUnitBoolExp | null;
  unitId?: UuidComparisonExp | null;
  videoTimestampId?: UuidComparisonExp | null;
  video_timestamp?: RecipeVideoTimestampBoolExp | null;
};
export type IngredientIngredientBoolExp = {
  _and?: ReadonlyArray<IngredientIngredientBoolExp> | null;
  _not?: IngredientIngredientBoolExp | null;
  _or?: ReadonlyArray<IngredientIngredientBoolExp> | null;
  foodId?: UuidComparisonExp | null;
  id?: UuidComparisonExp | null;
  wikiUrl?: StringComparisonExp | null;
};
export type FoodUnitBoolExp = {
  _and?: ReadonlyArray<FoodUnitBoolExp> | null;
  _not?: FoodUnitBoolExp | null;
  _or?: ReadonlyArray<FoodUnitBoolExp> | null;
  gramCoefficient?: IntComparisonExp | null;
  id?: UuidComparisonExp | null;
  name?: StringComparisonExp | null;
};
export type RecipeVideoTimestampBoolExp = {
  _and?: ReadonlyArray<RecipeVideoTimestampBoolExp> | null;
  _not?: RecipeVideoTimestampBoolExp | null;
  _or?: ReadonlyArray<RecipeVideoTimestampBoolExp> | null;
  directions?: RecipeDirectionBoolExp | null;
  directions_aggregate?: recipe_direction_aggregate_bool_exp | null;
  end?: IntComparisonExp | null;
  id?: UuidComparisonExp | null;
  ingredients?: RecipeIngredientBoolExp | null;
  ingredients_aggregate?: recipe_ingredient_aggregate_bool_exp | null;
  start?: IntComparisonExp | null;
};
export type recipe_ingredient_aggregate_bool_exp = {
  count?: recipe_ingredient_aggregate_bool_exp_count | null;
};
export type recipe_ingredient_aggregate_bool_exp_count = {
  arguments?: ReadonlyArray<RecipeIngredientSelectColumn> | null;
  distinct?: boolean | null;
  filter?: RecipeIngredientBoolExp | null;
  predicate: IntComparisonExp;
};
export type RecipeSourceProviderBoolExp = {
  _and?: ReadonlyArray<RecipeSourceProviderBoolExp> | null;
  _not?: RecipeSourceProviderBoolExp | null;
  _or?: ReadonlyArray<RecipeSourceProviderBoolExp> | null;
  description?: StringComparisonExp | null;
  id?: UuidComparisonExp | null;
  name?: StringComparisonExp | null;
  recipes?: RecipeRecipeBoolExp | null;
  recipes_aggregate?: recipe_recipe_aggregate_bool_exp | null;
  url?: StringComparisonExp | null;
};
export type recipe_recipe_aggregate_bool_exp = {
  count?: recipe_recipe_aggregate_bool_exp_count | null;
};
export type recipe_recipe_aggregate_bool_exp_count = {
  arguments?: ReadonlyArray<RecipeRecipeSelectColumn> | null;
  distinct?: boolean | null;
  filter?: RecipeRecipeBoolExp | null;
  predicate: IntComparisonExp;
};
export type RecipeTagsBoolExp = {
  _and?: ReadonlyArray<RecipeTagsBoolExp> | null;
  _not?: RecipeTagsBoolExp | null;
  _or?: ReadonlyArray<RecipeTagsBoolExp> | null;
  id?: UuidComparisonExp | null;
  name?: StringComparisonExp | null;
  recipeId?: UuidComparisonExp | null;
  seq?: IntComparisonExp | null;
};
export type recipe_tags_aggregate_bool_exp = {
  count?: recipe_tags_aggregate_bool_exp_count | null;
};
export type recipe_tags_aggregate_bool_exp_count = {
  arguments?: ReadonlyArray<RecipeTagsSelectColumn> | null;
  distinct?: boolean | null;
  filter?: RecipeTagsBoolExp | null;
  predicate: IntComparisonExp;
};
export type recipe_direction_equipment_aggregate_bool_exp = {
  count?: recipe_direction_equipment_aggregate_bool_exp_count | null;
};
export type recipe_direction_equipment_aggregate_bool_exp_count = {
  arguments?: ReadonlyArray<RecipeDirectionEquipmentSelectColumn> | null;
  distinct?: boolean | null;
  filter?: RecipeDirectionEquipmentBoolExp | null;
  predicate: IntComparisonExp;
};
export type RecipeDirectionIngredientBoolExp = {
  _and?: ReadonlyArray<RecipeDirectionIngredientBoolExp> | null;
  _not?: RecipeDirectionIngredientBoolExp | null;
  _or?: ReadonlyArray<RecipeDirectionIngredientBoolExp> | null;
  direction?: RecipeDirectionBoolExp | null;
  directionId?: UuidComparisonExp | null;
  id?: UuidComparisonExp | null;
  ingredient?: IngredientIngredientBoolExp | null;
  ingredientId?: UuidComparisonExp | null;
};
export type recipe_direction_ingredient_aggregate_bool_exp = {
  count?: recipe_direction_ingredient_aggregate_bool_exp_count | null;
};
export type recipe_direction_ingredient_aggregate_bool_exp_count = {
  arguments?: ReadonlyArray<RecipeDirectionIngredientSelectColumn> | null;
  distinct?: boolean | null;
  filter?: RecipeDirectionIngredientBoolExp | null;
  predicate: IntComparisonExp;
};
export type RecipeEquipmentObjRelInsertInput = {
  data: RecipeEquipmentInsertInput;
  onConflict?: RecipeEquipmentOnConflict | null;
};
export type RecipeEquipmentInsertInput = {
  equipment?: EquipmentEquipmentObjRelInsertInput | null;
  equipmentId?: any | null;
  id?: any | null;
  recipe?: RecipeRecipeObjRelInsertInput | null;
  recipeId?: any | null;
};
export type EquipmentEquipmentObjRelInsertInput = {
  data: EquipmentEquipmentInsertInput;
  onConflict?: EquipmentEquipmentOnConflict | null;
};
export type EquipmentEquipmentInsertInput = {
  configs?: EquipmentConfigArrRelInsertInput | null;
  equipment?: RecipeEquipmentArrRelInsertInput | null;
  id?: any | null;
  name?: string | null;
};
export type EquipmentConfigArrRelInsertInput = {
  data: ReadonlyArray<EquipmentConfigInsertInput>;
  onConflict?: EquipmentConfigOnConflict | null;
};
export type EquipmentConfigInsertInput = {
  config?: any | null;
  equipment?: EquipmentEquipmentObjRelInsertInput | null;
  equipmentId?: any | null;
  id?: any | null;
};
export type EquipmentConfigOnConflict = {
  constraint: EquipmentConfigConstraint;
  update_columns: ReadonlyArray<EquipmentConfigUpdateColumn>;
  where?: EquipmentConfigBoolExp | null;
};
export type RecipeEquipmentArrRelInsertInput = {
  data: ReadonlyArray<RecipeEquipmentInsertInput>;
  onConflict?: RecipeEquipmentOnConflict | null;
};
export type RecipeEquipmentOnConflict = {
  constraint: RecipeEquipmentConstraint;
  update_columns: ReadonlyArray<RecipeEquipmentUpdateColumn>;
  where?: RecipeEquipmentBoolExp | null;
};
export type EquipmentEquipmentOnConflict = {
  constraint: EquipmentEquipmentConstraint;
  update_columns: ReadonlyArray<EquipmentEquipmentUpdateColumn>;
  where?: EquipmentEquipmentBoolExp | null;
};
export type RecipeRecipeObjRelInsertInput = {
  data: RecipeRecipeInsertInput;
  onConflict?: RecipeRecipeOnConflict | null;
};
export type RecipeRecipeOnConflict = {
  constraint: RecipeRecipeConstraint;
  update_columns: ReadonlyArray<RecipeRecipeUpdateColumn>;
  where?: RecipeRecipeBoolExp | null;
};
export type RecipeDirectionEquipmentOnConflict = {
  constraint: RecipeDirectionEquipmentConstraint;
  update_columns: ReadonlyArray<RecipeDirectionEquipmentUpdateColumn>;
  where?: RecipeDirectionEquipmentBoolExp | null;
};
export type RecipeDirectionIngredientArrRelInsertInput = {
  data: ReadonlyArray<RecipeDirectionIngredientInsertInput>;
  onConflict?: RecipeDirectionIngredientOnConflict | null;
};
export type RecipeDirectionIngredientInsertInput = {
  direction?: RecipeDirectionObjRelInsertInput | null;
  directionId?: any | null;
  id?: any | null;
  ingredient?: IngredientIngredientObjRelInsertInput | null;
  ingredientId?: any | null;
};
export type IngredientIngredientObjRelInsertInput = {
  data: IngredientIngredientInsertInput;
  onConflict?: IngredientIngredientOnConflict | null;
};
export type IngredientIngredientInsertInput = {
  foodId?: any | null;
  id?: any | null;
  wikiUrl?: string | null;
};
export type IngredientIngredientOnConflict = {
  constraint: IngredientIngredientConstraint;
  update_columns: ReadonlyArray<IngredientIngredientUpdateColumn>;
  where?: IngredientIngredientBoolExp | null;
};
export type RecipeDirectionIngredientOnConflict = {
  constraint: RecipeDirectionIngredientConstraint;
  update_columns: ReadonlyArray<RecipeDirectionIngredientUpdateColumn>;
  where?: RecipeDirectionIngredientBoolExp | null;
};
export type RecipeVideoTimestampObjRelInsertInput = {
  data: RecipeVideoTimestampInsertInput;
  onConflict?: RecipeVideoTimestampOnConflict | null;
};
export type RecipeVideoTimestampInsertInput = {
  directions?: RecipeDirectionArrRelInsertInput | null;
  end?: number | null;
  id?: any | null;
  ingredients?: RecipeIngredientArrRelInsertInput | null;
  start?: number | null;
};
export type RecipeIngredientArrRelInsertInput = {
  data: ReadonlyArray<RecipeIngredientInsertInput>;
  onConflict?: RecipeIngredientOnConflict | null;
};
export type RecipeIngredientInsertInput = {
  amount?: number | null;
  comment?: string | null;
  id?: any | null;
  ingredient?: IngredientIngredientObjRelInsertInput | null;
  ingredientId?: any | null;
  name?: string | null;
  recipe?: RecipeRecipeObjRelInsertInput | null;
  recipeId?: any | null;
  seq?: number | null;
  text?: string | null;
  unit?: FoodUnitObjRelInsertInput | null;
  unitId?: any | null;
  videoTimestampId?: any | null;
  video_timestamp?: RecipeVideoTimestampObjRelInsertInput | null;
};
export type FoodUnitObjRelInsertInput = {
  data: FoodUnitInsertInput;
  onConflict?: FoodUnitOnConflict | null;
};
export type FoodUnitInsertInput = {
  gramCoefficient?: number | null;
  id?: any | null;
  name?: string | null;
};
export type FoodUnitOnConflict = {
  constraint: FoodUnitConstraint;
  update_columns: ReadonlyArray<FoodUnitUpdateColumn>;
  where?: FoodUnitBoolExp | null;
};
export type RecipeIngredientOnConflict = {
  constraint: RecipeIngredientConstraint;
  update_columns: ReadonlyArray<RecipeIngredientUpdateColumn>;
  where?: RecipeIngredientBoolExp | null;
};
export type RecipeVideoTimestampOnConflict = {
  constraint: RecipeVideoTimestampConstraint;
  update_columns: ReadonlyArray<RecipeVideoTimestampUpdateColumn>;
  where?: RecipeVideoTimestampBoolExp | null;
};
export type RecipeSourceProviderObjRelInsertInput = {
  data: RecipeSourceProviderInsertInput;
  onConflict?: RecipeSourceProviderOnConflict | null;
};
export type RecipeSourceProviderInsertInput = {
  description?: string | null;
  id?: any | null;
  name?: string | null;
  recipes?: RecipeRecipeArrRelInsertInput | null;
  url?: string | null;
};
export type RecipeRecipeArrRelInsertInput = {
  data: ReadonlyArray<RecipeRecipeInsertInput>;
  onConflict?: RecipeRecipeOnConflict | null;
};
export type RecipeSourceProviderOnConflict = {
  constraint: RecipeSourceProviderConstraint;
  update_columns: ReadonlyArray<RecipeSourceProviderUpdateColumn>;
  where?: RecipeSourceProviderBoolExp | null;
};
export type RecipeTagsArrRelInsertInput = {
  data: ReadonlyArray<RecipeTagsInsertInput>;
  onConflict?: RecipeTagsOnConflict | null;
};
export type RecipeTagsInsertInput = {
  id?: any | null;
  name?: string | null;
  recipeId?: any | null;
  seq?: number | null;
};
export type RecipeTagsOnConflict = {
  constraint: RecipeTagsConstraint;
  update_columns: ReadonlyArray<RecipeTagsUpdateColumn>;
  where?: RecipeTagsBoolExp | null;
};
export type RecipeFormMutation$variables = {
  object: RecipeRecipeInsertInput;
  onConflict: RecipeRecipeOnConflict;
};
export type RecipeFormMutation$data = {
  readonly insertRecipeRecipeOne: {
    readonly id: any;
  } | null;
};
export type RecipeFormMutation = {
  response: RecipeFormMutation$data;
  variables: RecipeFormMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "object"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "onConflict"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "object",
        "variableName": "object"
      },
      {
        "kind": "Variable",
        "name": "onConflict",
        "variableName": "onConflict"
      }
    ],
    "concreteType": "RecipeRecipe",
    "kind": "LinkedField",
    "name": "insertRecipeRecipeOne",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RecipeFormMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RecipeFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8d1819bf4c7a4d8929db2863337aa91f",
    "id": null,
    "metadata": {},
    "name": "RecipeFormMutation",
    "operationKind": "mutation",
    "text": "mutation RecipeFormMutation(\n  $object: RecipeRecipeInsertInput!\n  $onConflict: RecipeRecipeOnConflict!\n) {\n  insertRecipeRecipeOne(object: $object, onConflict: $onConflict) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "c1cbe0cc41e3dac7d8f767b9f9affb55";

export default node;
