import HttpError from '@wasp/core/HttpError.js'
import {Prisma} from '@prisma/client'
import {ListRecipesRequest, ListRecipesResponse} from "../shared/types/queries";
import {ViewRecipeRequest, ViewRecipeResponse} from "@wasp/shared/types/queries";

export const listRecipes = async (args: ListRecipesRequest, context: any): Promise<ListRecipesResponse> => {
  const delegate = context.entities.Recipe as Prisma.RecipeDelegate<{}>;
  const recipes = await delegate.findMany({
    select: {
      id: true,
      name: true,
      source: true,
    },
  })
  return {
    recipes,
  }
}

export const viewRecipe = async (args: ViewRecipeRequest, context: any): Promise<ViewRecipeResponse> => {
  if (!context.user) {
    throw new HttpError(401)
  }

  const delegate = context.entities.Recipe as Prisma.RecipeDelegate<{}>;
  const recipe = await delegate.findUnique({
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      name: true,
      sourcePath: true,
      imageUrl: true,
      videoUrl: true,
      userId: true,
      sourceId: true,
      source: true,
      recipeDirections: true,
      recipeIngredients: true,
    },
    where: {
      id: args.id
    }
  })
  return {
    recipe,
  }
}
