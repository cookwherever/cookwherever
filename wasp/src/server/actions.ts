import HttpError from "@wasp/core/HttpError.js";
import {Prisma} from "@prisma/client";
import {
  CreateRecipeRequest,
  CreateRecipeResponse,
  SearchFoodForIngredientRequest,
  SearchFoodForIngredientResponse,
  UpdateRecipeRequest,
  UpdateRecipeResponse,
  UpsertFdcFoodRequest,
  UpsertFdcFoodResponse,
  UpsertIngredientFoodRequest,
  UpsertIngredientFoodResponse,
} from "../shared/types/actions";
import {IngredientName} from ".prisma/client";

export const createRecipe = async (
  args: CreateRecipeRequest,
  context: any,
): Promise<CreateRecipeResponse> => {
  if (!context.user) {
    throw new HttpError(401);
  }

  // TODO (cthompson) if we are updating an existing recipe, we might want to remove the existing

  const prismaCreateRecipe: Prisma.RecipeUpsertArgs = {
    where: {
      name_sourcePath: {
        name: args.name,
        sourcePath: args.sourcePath
      }
    },
    update: {
      source: {
        connectOrCreate: {
          where: {
            name: args.source,
          },
          create: {
            name: args.source,
            url: args.sourceUrl,
          },
        },
      },
      imageUrl: args.imageUrl,
      videoUrl: args.videoUrl,
      creator: {connect: {id: context.user.id}},
    },
    create: {
      name: args.name,
      source: {
        connectOrCreate: {
          where: {
            name: args.source,
          },
          create: {
            name: args.source,
            url: args.sourceUrl,
          },
        },
      },
      sourcePath: args.sourcePath,
      imageUrl: args.imageUrl,
      videoUrl: args.videoUrl,
      creator: {connect: {id: context.user.id}},
    },
  };

  const delegate = context.entities.Recipe as Prisma.RecipeDelegate<{}>;
  const createdRecipe = await delegate.upsert(prismaCreateRecipe);

  await Promise.all(args.directions.map(async (i, idx) => {
    const createUpdate: Prisma.RecipeDirectionCreateInput = {
      sequence: idx,
      text: i.text,
      Recipe: {
        connect: {
          id: createdRecipe.id,
        }
      }
    }
    const recipeDirectionUpsertArgs: Prisma.RecipeDirectionUpsertArgs = {
      where: {
        recipeId_sequence: {
          recipeId: createdRecipe.id,
          sequence: idx,
        }
      },
      create: createUpdate,
      update: createUpdate
    };
    const delegate = context.entities.RecipeDirection as Prisma.RecipeDirectionDelegate<{}>;
    await delegate.upsert(recipeDirectionUpsertArgs);
  }));

  await Promise.all(args.ingredients.map(async (i, idx) => {
    const d = context.entities.FoodUnit as Prisma.FoodUnitDelegate<{}>;
    const ingredientNameDelegate = context.entities.IngredientName as Prisma.IngredientNameDelegate<{}>;

    const createUnit = async (): Promise<Prisma.FoodUnitCreateNestedOneWithoutRecipeIngredientInput | undefined> => {
      if (!i.unit) {
        return undefined;
      }

      return {
        connectOrCreate: {
          where: {
            name: i.unit,
          },
          create: {
            name: i.unit
          }
        }
      }
    }

    const ingredientName = await ingredientNameDelegate.findUnique({
      where: {
        name: i.name
      },
      select: {
        ingredientId: true
      }
    });

    // TODO (cthompson) search IngredientName for names that match the ingredient and associate
    const createUpdate: Prisma.RecipeIngredientCreateInput = {
      sequence: idx,
      text: i.text,
      name: i.name,
      amount: i.amount,
      comment: i.comment,
      ingredient: ingredientName?.ingredientId ? {
        connect: {
          id: ingredientName?.ingredientId
        }
      } : undefined,
      Recipe: {
        connect: {
          id: createdRecipe.id,
        }
      },
      unit: await createUnit(),
    }
    const recipeIngredientCreateArgs: Prisma.RecipeIngredientUpsertArgs = {
      where: {
        recipeId_sequence: {
          recipeId: createdRecipe.id,
          sequence: idx,
        }
      },
      create: createUpdate,
      update: createUpdate
    };
    const delegate = context.entities.RecipeIngredient as Prisma.RecipeIngredientDelegate<{}>;
    await delegate.upsert(recipeIngredientCreateArgs);
  }));

  return {
    id: createdRecipe.id,
  };
};

export const updateRecipe = async (
  args: UpdateRecipeRequest,
  context: any,
): Promise<UpdateRecipeResponse> => {
  const prismaUpdateManyRecipe: Prisma.RecipeUpdateManyArgs = {
    where: {
      id: args.id,
      creator: {id: context.user.id},
    },
    data: {},
  };

  const delegate = context.entities.Recipe as Prisma.RecipeDelegate<{}>;
  const updatedRecipe = await delegate.updateMany(prismaUpdateManyRecipe);
  return {
    count: updatedRecipe.count,
  };
};

export const upsertFdcFood = async (
  args: UpsertFdcFoodRequest,
  context: any,
): Promise<UpsertFdcFoodResponse> => {
  const delegate = context.entities.Food as Prisma.FoodDelegate<{}>;
  const existingFood = await delegate.findFirst({
    where: {
      OR: {
        fdcId: args.fdcId,
        description: args.description
      },
    }
  });

  const formatUnit = (name: string, comment: string): { name: string, comment: string } => {
    const unitParts = name.split(", ");
    const formattedUnitName = unitParts[0];
    const formattedComment = comment + ", " + unitParts.slice(1).join(", ");
    return {
      name: formattedUnitName,
      comment: formattedComment
    }
  }

  if (existingFood) {
    const upsertFood: Prisma.FoodUpdateArgs = {
      where: {
        id: existingFood.id,
      },
      data: {
        description: args.description,
        measurements: {
          connectOrCreate: await Promise.all(args.portions.map(async (portion): Promise<Prisma.FoodMeasurementCreateOrConnectWithoutFoodInput> => {
            const d = context.entities.FoodUnit as Prisma.FoodUnitDelegate<{}>;

            const unitName = portion.unit.name || 'unknown';
            const formatted = formatUnit(unitName, portion.unit.comment);

            const unit = await d.upsert({
              where: {
                name: formatted.name
              },
              update: {},
              create: {
                name: formatted.name,
              },
            });

            return {
              where: {
                foodId_foodUnitId: {
                  foodId: existingFood.id,
                  foodUnitId: unit.id,
                }
              },
              create: {
                amount: portion.amount,
                mass: portion.mass,
                comment: formatted.comment,
                unit: {
                  connect: {
                    id: unit.id,
                  }
                }
              }
            }
          }))
        }
      }
    };
    const updatedFood = await delegate.update(upsertFood);
    return {
      id: updatedFood.id
    }
  } else {
    const createFood: Prisma.FoodCreateArgs = {
      data: {
        fdcId: args.fdcId,
        description: args.description,
        measurements: {
          create: await Promise.all(args.portions.map(async (portion): Promise<Prisma.FoodMeasurementCreateWithoutFoodInput> => {
            const d = context.entities.FoodUnit as Prisma.FoodUnitDelegate<{}>;

            const unitName = portion.unit.name;
            const comment = portion.unit.comment;

            const formatted = formatUnit(unitName, comment);

            // TODO (cthompson) normalize unit name: tsp == teaspoon

            return {
              amount: portion.amount,
              mass: portion.mass,
              comment: formatted.comment,
              unit: {
                connectOrCreate: {
                  where: {
                    name: formatted.name
                  },
                  create: {
                    name: formatted.name
                  }
                }
              }
            }
          }))
        }
      }
    };
    const createdFood = await delegate.create(createFood);
    return {
      id: createdFood.id
    };
  }
}

export const searchFoodForIngredient = async (
  args: SearchFoodForIngredientRequest,
  context: any,
): Promise<SearchFoodForIngredientResponse> => {
  const delegate = context.entities.Food as Prisma.FoodDelegate<{}>;

  // FDA stores ingredients like "black pepper" as "Spices, pepper, black"
  const modifiedIngredient = args.ingredient.split(" ").reverse().join(", ")

  const foods = await delegate.findMany({
    where: {
      OR: [
        {
          description: {
            contains: args.ingredient,
            mode: 'insensitive'
          }
        },
        {
          description: {
            contains: modifiedIngredient,
            mode: 'insensitive'
          }
        },
      ]
    },
    take: 10,
  });
  return {
    foods: foods
  }
}

const upsertIngredient = async (
  ingredientDelegate: Prisma.IngredientDelegate<{}>,
  ingredientNameDelegate: Prisma.IngredientNameDelegate<{}>,
  ingredientName: IngredientName,
  foodId: string
) => {
  if (ingredientName.ingredientId) {
    const ingredient = await ingredientDelegate.update({
      where: {
        id: ingredientName.ingredientId,
      },
      data: {
        foodId: foodId,
      }
    });
    return ingredient.id;
  }
  const ingredient = await ingredientDelegate.create({
    data: {
      foodId: foodId,
    }
  })
  await ingredientNameDelegate.update({
    where: {
      id: ingredientName.id
    },
    data: {
      ingredientId: ingredient.id
    }
  });
  return ingredient.id;
}

export const upsertIngredientFood = async (
  args: UpsertIngredientFoodRequest,
  context: any,
): Promise<UpsertIngredientFoodResponse> => {
  const ingredientDelegate = context.entities.Ingredient as Prisma.IngredientDelegate<{}>;
  const ingredientNameDelegate = context.entities.IngredientName as Prisma.IngredientNameDelegate<{}>;
  const recipeIngredientDelegate = context.entities.RecipeIngredient as Prisma.RecipeIngredientDelegate<{}>;
  const foodDelegate = context.entities.Food as Prisma.FoodDelegate<{}>;

  const food = await foodDelegate.findUnique({
    where: {
      description: args.foodDescription
    }
  });

  if (!food) {
    console.log('could not find food for description:', args.foodDescription);
    throw new HttpError(401);
  }

  const ingredientName = await ingredientNameDelegate.upsert({
    where: {
      name: args.ingredientName
    },
    create: {
      name: args.ingredientName
    },
    update: {}
  });

  const ingredientId = await upsertIngredient(ingredientDelegate, ingredientNameDelegate, ingredientName, food.id);

  const updates = await recipeIngredientDelegate.updateMany({
    where: {
      name: args.ingredientName
    },
    data: {
      ingredientId: ingredientId
    }
  });

  console.log(`updated ${updates.count} recipe ingredients to have food ingredient ${args.ingredientName}`)

  return {
    id: ingredientId
  }
}
