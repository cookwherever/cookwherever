import createRecipe from "@wasp/actions/createRecipe";
import {QueryWithTypes} from "./wrap";
import {
	CreateRecipeRequest,
	CreateRecipeResponse,
	MarkGroceryListItemRequest,
	MarkGroceryListItemResponse,
	SaveGroceryListItemRequest,
	SaveGroceryListItemResponse,
	SearchFoodForIngredientRequest,
	SearchFoodForIngredientResponse,
	UpsertIngredientFoodRequest,
	UpsertIngredientFoodResponse
} from "@wasp/shared/types/actions";
import searchFoodForIngredient from "@wasp/actions/searchFoodForIngredient";
import upsertIngredientFood from "@wasp/actions/upsertIngredientFood";
import saveGroceryListItem from "@wasp/actions/saveGroceryListItem";
import markGroceryListItem from "@wasp/actions/markGroceryListItem";

export const typedCreateRecipe: QueryWithTypes<CreateRecipeRequest,
  CreateRecipeResponse> = createRecipe;
export const typedSearchFoodForIngredient: QueryWithTypes<SearchFoodForIngredientRequest,
  SearchFoodForIngredientResponse> = searchFoodForIngredient;
export const typedUpsertIngredientFood: QueryWithTypes<UpsertIngredientFoodRequest,
  UpsertIngredientFoodResponse> = upsertIngredientFood;
export const typedSaveGroceryListItem: QueryWithTypes<SaveGroceryListItemRequest,
  SaveGroceryListItemResponse> = saveGroceryListItem;
export const typedMarkGroceryListItem: QueryWithTypes<MarkGroceryListItemRequest,
  MarkGroceryListItemResponse> = markGroceryListItem;
