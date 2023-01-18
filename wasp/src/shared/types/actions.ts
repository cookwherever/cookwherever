export interface CreateRecipeIngredient {
  text: string;
  name?: string;
  amount?: number;
  comment?: string;
  unit?: string;
}

export interface CreateRecipeDirection {
  text: string;
}

export interface CreateRecipeRequest {
  name: string;
  source: string;
  sourcePath: string;
  sourceUrl?: string;
  imageUrl: string;
  videoUrl?: string;
  ingredients: CreateRecipeIngredient[];
  directions: CreateRecipeDirection[];
}

export interface CreateRecipeResponse {
  id: string;
}

export interface UpdateRecipeRequest extends CreateRecipeRequest {
  id: string;
}

export interface UpdateRecipeResponse {
  count: number;
}

export interface UpsertFdcFoodRequestPortionUnit {
  name: string;
  comment: string;
}

export interface UpsertFdcFoodRequestPortion {
  amount: number;
  unit: UpsertFdcFoodRequestPortionUnit;
  mass: number;
}

export interface UpsertFdcFoodRequest {
  fdcId: number;
  description: string;
  portions: UpsertFdcFoodRequestPortion[];
}

export interface UpsertFdcFoodResponse {
  id: string;
}

export interface SearchFoodForIngredientRequest {
  ingredient: string;
}

export interface IngredientSearchResponseFood {
  id: string
  description: string
  fdcId: number | null
}

export interface SearchFoodForIngredientResponse {
  foods: IngredientSearchResponseFood[];
}

export interface UpsertIngredientFoodRequest {
  ingredientName: string;
  foodDescription: string;
}

export interface UpsertIngredientFoodResponse {
  id: string;
}
