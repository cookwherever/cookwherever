import HttpError from "@wasp/core/HttpError.js";
import { Prisma } from "@prisma/client";
import {
	UpsertIngredientFoodRequest,
	UpsertIngredientFoodResponse,
} from "@wasp/shared/types/actions";
import { IngredientName } from ".prisma/client";

const upsertIngredient = async (
	ingredientDelegate: Prisma.IngredientDelegate<{}>,
	ingredientNameDelegate: Prisma.IngredientNameDelegate<{}>,
	ingredientName: IngredientName,
	foodId: string,
) => {
	if (ingredientName.ingredientId) {
		const ingredient = await ingredientDelegate.update({
			where: {
				id: ingredientName.ingredientId,
			},
			data: {
				foodId: foodId,
			},
		});
		return ingredient.id;
	}
	const ingredient = await ingredientDelegate.create({
		data: {
			foodId: foodId,
		},
	});
	await ingredientNameDelegate.update({
		where: {
			id: ingredientName.id,
		},
		data: {
			ingredientId: ingredient.id,
		},
	});
	return ingredient.id;
};

export const upsertIngredientFood = async (
	args: UpsertIngredientFoodRequest,
	context: any,
): Promise<UpsertIngredientFoodResponse> => {
	const ingredientDelegate = context.entities
		.Ingredient as Prisma.IngredientDelegate<{}>;
	const ingredientNameDelegate = context.entities
		.IngredientName as Prisma.IngredientNameDelegate<{}>;
	const recipeIngredientDelegate = context.entities
		.RecipeIngredient as Prisma.RecipeIngredientDelegate<{}>;
	const foodDelegate = context.entities.Food as Prisma.FoodDelegate<{}>;

	const food = await foodDelegate.findUnique({
		where: {
			description: args.foodDescription,
		},
	});

	if (!food) {
		console.log("could not find food for description:", args.foodDescription);
		throw new HttpError(401);
	}

	const ingredientName = await ingredientNameDelegate.upsert({
		where: {
			name: args.ingredientName,
		},
		create: {
			name: args.ingredientName,
		},
		update: {},
	});

	const ingredientId = await upsertIngredient(
		ingredientDelegate,
		ingredientNameDelegate,
		ingredientName,
		food.id,
	);

	const updates = await recipeIngredientDelegate.updateMany({
		where: {
			name: args.ingredientName,
		},
		data: {
			ingredientId: ingredientId,
		},
	});

	console.log(
		`updated ${updates.count} recipe ingredients to have food ingredient ${args.ingredientName}`,
	);

	return {
		id: ingredientId,
	};
};
