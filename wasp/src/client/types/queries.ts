import {QueryWithTypes} from "./wrap";
import {
	AdminIngredientsRequest,
	AdminIngredientsResponse,
	ListRecipesRequest,
	ListRecipesResponse,
	ViewRecipeRequest,
	ViewRecipeResponse,
} from "../../shared/types/queries";
import listRecipes from "@wasp/queries/listRecipes";
import viewRecipe from "@wasp/queries/viewRecipe";
import adminIngredients from "@wasp/queries/adminIngredients";

export const typedListRecipes: QueryWithTypes<ListRecipesRequest,
  ListRecipesResponse> = listRecipes;
export const typedViewRecipe: QueryWithTypes<ViewRecipeRequest,
  ViewRecipeResponse> = viewRecipe;
export const typedAdminIngredients: QueryWithTypes<AdminIngredientsRequest,
  AdminIngredientsResponse> = adminIngredients;
