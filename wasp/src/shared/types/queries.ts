import {ListRecipesRecipe, Recipe} from "./recipe";

export interface ListRecipesRequest {
  source?: string;
  search?: string;
  ingredients?: string[];
  cursor?: string;
}

export interface ListRecipesResponse {
  recipes: ListRecipesRecipe[];
}

export interface ViewRecipeRequest {
  id: string;
}

export interface ViewRecipeResponse {
  recipe: Recipe;
}

export interface AdminIngredientsRequest {
  search: string | undefined;
}

export interface AdminIngredientsResponseIngredient {
  name: string;
  count: number | undefined;
  ingredient?: string;
}

export interface AdminIngredientsResponse {
  ingredients: AdminIngredientsResponseIngredient[];
}

export interface GetSearchPropertiesRequest {
}

interface GetSearchPropertiesResponseSource {
  id: string;
  name: string;
  url: string | null;
}

export interface GetSearchPropertiesResponse {
  sources: GetSearchPropertiesResponseSource[];
}

export interface ViewGroceryListRequest {
}

export interface GroceryListItem {
  id: string;
  text: string;
  obtainedAt: Date;
}

export interface ViewGroceryListResponse {
  groceryListItems: GroceryListItem[];
}
