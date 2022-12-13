import {ListRecipesRecipe, Recipe} from "./recipe";

export interface ListRecipesRequest {
}

export interface ListRecipesResponse {
  recipes: ListRecipesRecipe[]
}

export interface ViewRecipeRequest {
  id: string
}

export interface ViewRecipeResponse {
  recipe: Recipe
}
