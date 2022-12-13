import {
	ListRecipesRequest,
	ListRecipesResponse,
	ViewRecipeRequest,
	ViewRecipeResponse,
} from "@wasp/shared/types/queries";
import listRecipes from "@wasp/queries/listRecipes";
import viewRecipe from "@wasp/queries/viewRecipe";
import { QueryWithTypes } from "./wrap";

export const typedListRecipes: QueryWithTypes<
	ListRecipesRequest,
	ListRecipesResponse
> = listRecipes;
export const typedViewRecipe: QueryWithTypes<
	ViewRecipeRequest,
	ViewRecipeResponse
> = viewRecipe;
