import {
	SearchFoodForIngredientRequest,
	SearchFoodForIngredientResponse,
} from "@wasp/shared/types/actions";
import { Prisma } from "@prisma/client";

export const searchFoodForIngredient = async (
	args: SearchFoodForIngredientRequest,
	context: any,
): Promise<SearchFoodForIngredientResponse> => {
	const delegate = context.entities.Food as Prisma.FoodDelegate<{}>;

	// FDA stores ingredients like "black pepper" as "Spices, pepper, black"
	const modifiedIngredient = args.ingredient.split(" ").reverse().join(", ");

	const foods = await delegate.findMany({
		where: {
			OR: [
				{
					description: {
						contains: args.ingredient,
						mode: "insensitive",
					},
				},
				{
					description: {
						contains: modifiedIngredient,
						mode: "insensitive",
					},
				},
			],
		},
		take: 10,
	});
	return {
		foods: foods,
	};
};
