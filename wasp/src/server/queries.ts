import HttpError from "@wasp/core/HttpError.js";
import {Prisma} from "@prisma/client";
import {
  AdminIngredientsRequest,
  AdminIngredientsResponse,
  ListRecipesRequest,
  ListRecipesResponse,
  ViewRecipeRequest,
  ViewRecipeResponse,
} from "../shared/types/queries";

export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

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
          mode: 'insensitive',
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
      recipeIngredients: {
        select: {
          id: true,
          sequence: true,
          text: true,
          amount: true,
          name: true,
          comment: true,
          unit: true,
          ingredient: {
            select: {
              food: {
                select: {
                  description: true,
                  measurements: {
                    select: {
                      amount: true,
                      unit: true,
                      comment: true,
                      mass: true
                    }
                  }
                }
              }
            }
          },
        }
      },
    },
    where: {
      id: args.id,
    },
  });

  if (!recipe) {
    throw new HttpError(404, "recipe not found");
  }

  const measuredIngredients = recipe.recipeIngredients.map(ingredient => {
    const ingredientUnit = ingredient.unit;
    const ingredientAmount = ingredient.amount;
    const unitGramCoefficient = ingredientUnit?.gramCoefficient;
    const foodIngredient = ingredient.ingredient;

    if (!ingredientUnit || !ingredientAmount || !unitGramCoefficient) {
      return ingredient;
    }
    console.log(ingredient);
    console.log(foodIngredient?.food.measurements);

    // TODO (cthompson) a specific measurement should be used instead of searching
    const findMeasurement = () => {
      const food = foodIngredient?.food;
      if (!food || food.measurements.length === 0) {
        return null;
      }

      const measurement = food.measurements.find(m => m.unit.name === ingredientUnit.name);
      if (measurement) {
        return measurement
      }
      return food.measurements[0];
    }

    const measurement = findMeasurement();
    const measurementGramCoeff = measurement?.unit.gramCoefficient;
    if (!measurement || !measurementGramCoeff) {
      return ingredient;
    }

    // ingredient: 2 garlic cloves
    // food: 1 garlic clove == 3 grams

    // ingredient: 3 tbsp flour
    // food: 1 cup flour == 100 grams

    console.log(`${ingredientAmount} * ${unitGramCoefficient} / ${measurement.amount} * ${measurementGramCoeff} * ${measurement.mass}`)

    const calculatedMass = (
      (measurement.amount * measurementGramCoeff) / (ingredientAmount * unitGramCoefficient)
    ) * measurement.mass;
    return {
      ...ingredient,
      calculatedMass,
    }
  }).map(i => ({
    ...i,
    ingredient: undefined
  }));

  return {
    recipe: {
      ...recipe,
      recipeIngredients: measuredIngredients
    },
  };
};

export const adminIngredients = async (
  args: AdminIngredientsRequest,
  context: any,
): Promise<AdminIngredientsResponse> => {
  const delegate = context.entities.RecipeIngredient as Prisma.RecipeIngredientDelegate<{}>;
  const ingredientNameDelegate = context.entities.IngredientName as Prisma.IngredientNameDelegate<{}>;
  const recipeIngredients = await delegate.groupBy({
    by: [
      'name'
    ],
    orderBy: {
      _count: {
        name: 'desc'
      }
    },
    _count: true,
    take: 100,
  });

  const ingredients = await Promise.all(recipeIngredients.map(async i => {
    if (!i.name) {
      return
    }

    const ingredient = await ingredientNameDelegate.findUnique({
      where: {
        name: i.name
      },
      select: {
        ingredient: {
          select: {
            food: true
          }
        }
      }
    });

    return {
      name: i.name,
      count: i._count,
      ingredient: ingredient?.ingredient?.food.description,
    }
  }));

  return {
    ingredients: ingredients.filter(notEmpty),
  }
}
