import {SaveGroceryListItemRequest, SaveGroceryListItemResponse,} from "@wasp/shared/types/actions";
import {Prisma} from "@prisma/client";
import HttpError from "@wasp/core/HttpError.js";

export const saveGroceryListItem = async (
  args: SaveGroceryListItemRequest,
  context: any,
): Promise<SaveGroceryListItemResponse> => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const groceryListItemDelegate = context.entities
    .GroceryListItem as Prisma.GroceryListItemDelegate<{}>;

  const existingItem = await groceryListItemDelegate.findUnique({
    where: {
      recipeIngredientId: args.recipeIngredientId,
    }
  });

  if (existingItem) {
    return {
      existingItem: true
    }
  }

  await groceryListItemDelegate.create({
    data: {
      userId: context.user.id,
      text: args.text,
      recipeIngredientId: args.recipeIngredientId,
    },
  });
  return {
    existingItem: false
  };
};
