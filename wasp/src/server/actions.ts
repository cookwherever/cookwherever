import HttpError from '@wasp/core/HttpError.js'
import {CreateRecipeRequest, CreateRecipeResponse} from "@wasp/shared/types/actions";
import {Prisma} from "@prisma/client";
import {UpdateRecipeRequest, UpdateRecipeResponse} from "../shared/types/actions";

export const createRecipe = async (args: CreateRecipeRequest, context: any): Promise<CreateRecipeResponse> => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const prismaCreateRecipe: Prisma.RecipeCreateArgs = {
    data: {
      name: args.name,
      source: {
        connectOrCreate: {
          where: {
            name: args.name,
          },
          create: {
            name: args.name,
          }
        }
      },
      sourcePath: args.sourcePath,
      creator: {connect: {id: context.user.id}}
    }
  };

  const delegate = context.entities.Recipe as Prisma.RecipeDelegate<{}>;
  const createdRecipe = await delegate.create(prismaCreateRecipe);
  return {
    id: createdRecipe.id
  }
}

export const updateRecipe = async (args: UpdateRecipeRequest, context: any): Promise<UpdateRecipeResponse> => {
  const prismaUpdateManyRecipe: Prisma.RecipeUpdateManyArgs = {
    where: {
      id: args.id,
      creator: {id: context.user.id}
    },
    data: {}
  }

  const delegate = context.entities.Recipe as Prisma.RecipeDelegate<{}>;
  const updatedRecipe = await delegate.updateMany(prismaUpdateManyRecipe);
  return {
    count: updatedRecipe.count
  }
}
