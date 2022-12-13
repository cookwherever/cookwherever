import { ListRecipesRecipe, Recipe } from "./recipe";

export interface ListRecipesRequest {
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
