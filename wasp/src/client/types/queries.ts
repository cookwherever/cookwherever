import { QueryWithTypes } from "./wrap";
import {
	AdminIngredientsRequest,
	AdminIngredientsResponse,
	GetSearchPropertiesRequest,
	GetSearchPropertiesResponse,
	ListRecipesRequest,
	ListRecipesResponse,
	ViewGroceryListRequest,
	ViewGroceryListResponse,
	ViewRecipeRequest,
	ViewRecipeResponse,
} from "@wasp/shared/types/queries";
import listRecipes from "@wasp/queries/listRecipes";
import viewRecipe from "@wasp/queries/viewRecipe";
import adminIngredients from "@wasp/queries/adminIngredients";
import getSearchProperties from "@wasp/queries/getSearchProperties";
import viewGroceryList from "@wasp/queries/viewGroceryList";

export const typedListRecipes: QueryWithTypes<
	ListRecipesRequest,
	ListRecipesResponse
> = listRecipes;
export const typedViewRecipe: QueryWithTypes<
	ViewRecipeRequest,
	ViewRecipeResponse
> = viewRecipe;
export const typedAdminIngredients: QueryWithTypes<
	AdminIngredientsRequest,
	AdminIngredientsResponse
> = adminIngredients;
export const typedGetSearchProperties: QueryWithTypes<
	GetSearchPropertiesRequest,
	GetSearchPropertiesResponse
> = getSearchProperties;
export const typedViewGroceryList: QueryWithTypes<
	ViewGroceryListRequest,
	ViewGroceryListResponse
> = viewGroceryList;
