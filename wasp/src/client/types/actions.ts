import updateRecipe from "@wasp/actions/updateRecipe";
import createRecipe from "@wasp/actions/createRecipe";
import {QueryWithTypes} from "./wrap";
import {
	CreateRecipeRequest,
	CreateRecipeResponse,
	SearchFoodForIngredientRequest,
	SearchFoodForIngredientResponse,
	UpdateRecipeRequest,
	UpdateRecipeResponse,
	UpsertIngredientFoodRequest,
	UpsertIngredientFoodResponse,
} from "../../shared/types/actions";
import searchFoodForIngredient from "@wasp/actions/searchFoodForIngredient";
import upsertIngredientFood from "@wasp/actions/upsertIngredientFood";

export const typedUpdateRecipe: QueryWithTypes<UpdateRecipeRequest,
  UpdateRecipeResponse> = updateRecipe;
export const typedCreateRecipe: QueryWithTypes<CreateRecipeRequest,
  CreateRecipeResponse> = createRecipe;
export const typedSearchFoodForIngredient: QueryWithTypes<SearchFoodForIngredientRequest,
  SearchFoodForIngredientResponse> = searchFoodForIngredient;
export const typedUpsertIngredientFood: QueryWithTypes<UpsertIngredientFoodRequest,
  UpsertIngredientFoodResponse> = upsertIngredientFood;
