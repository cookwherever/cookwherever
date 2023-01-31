import {Prisma} from "@prisma/client";
import HttpError from "@wasp/core/HttpError.js";
import {MarkGroceryListItemRequest, MarkGroceryListItemResponse} from "@wasp/shared/types/actions";

export const markGroceryListItem = async (
  args: MarkGroceryListItemRequest,
  context: any,
): Promise<MarkGroceryListItemResponse> => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const groceryListItemDelegate = context.entities
    .GroceryListItem as Prisma.GroceryListItemDelegate<{}>;

  const groceryListItem = await groceryListItemDelegate.findFirstOrThrow({
    where: {
      id: args.groceryListItemId,
      userId: context.user.id,
    }
  });

  await groceryListItemDelegate.update({
    where: {
      id: groceryListItem.id,
    },
    data: {
      obtainedAt: !groceryListItem.obtainedAt ? new Date() : null
    }
  })
  return {};
};
