import HttpError from "@wasp/core/HttpError.js";
import {Prisma} from "@prisma/client";
import {ListRecipesRequest, ListRecipesResponse, ViewRecipeRequest, ViewRecipeResponse,} from "../shared/types/queries";

export const listRecipes = async (
  args: ListRecipesRequest,
  context: any,
): Promise<ListRecipesResponse> => {
  const delegate = context.entities.Recipe as Prisma.RecipeDelegate<{}>;

  const cursor = args.cursor
    ? {
      cursor: {
        id: args.cursor,
      },
    }
    : undefined;

  const getIngredientFilter = () => {
    if (!args.ingredients || args.ingredients.length === 0) {
      return {};
    }
    return {
      recipeIngredients: {
        some: {
          AND: args.ingredients.map((i) => ({text: {contains: i}})),
        },
      },
    };
  };

  const recipes = await delegate.findMany({
    ...cursor,
    take: 21,
    select: {
      id: true,
      name: true,
      source: true,
      imageUrl: true,
    },
    where: {
      OR: {
        name: {
          contains: args.search,
        },
        ...getIngredientFilter(),
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  return {
    recipes,
  };
};

export const viewRecipe = async (
  args: ViewRecipeRequest,
  context: any,
): Promise<ViewRecipeResponse> => {
  if (!context.user) {
    throw new HttpError(401);
  }

  if (!args.id) {
    throw new HttpError(400, "no recipe id provided");
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
      id: args.id,
    },
  });

  if (!recipe) {
    throw new HttpError(404, "recipe not found");
  }

  return {
    recipe,
  };
};
