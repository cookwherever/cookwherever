import {ViewGroceryListRequest, ViewGroceryListResponse,} from "@wasp/shared/types/queries";
import {Prisma} from "@prisma/client";
import HttpError from "@wasp/core/HttpError.js";

export const viewGroceryList = async (
  args: ViewGroceryListRequest,
  context: any,
): Promise<ViewGroceryListResponse> => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const delegate = context.entities
    .GroceryListItem as Prisma.GroceryListItemDelegate<{}>;

  const groceryListItems = await delegate.findMany({
    where: {
      userId: context.user.id,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return {
    groceryListItems: groceryListItems.map((i) => ({
      id: i.id,
      text: i.text,
      obtainedAt: i.obtainedAt
    })),
  };
};
