import {
	CreateRecipeRequest,
	CreateRecipeResponse,
	UpdateRecipeRequest,
	UpdateRecipeResponse,
} from "@wasp/shared/types/actions";
import updateRecipe from "@wasp/actions/updateRecipe";
import createRecipe from "@wasp/actions/createRecipe";
import { QueryWithTypes } from "./wrap";

export const typedUpdateRecipe: QueryWithTypes<
	UpdateRecipeRequest,
	UpdateRecipeResponse
> = updateRecipe;
export const typedCreateRecipe: QueryWithTypes<
	CreateRecipeRequest,
	CreateRecipeResponse
> = createRecipe;
