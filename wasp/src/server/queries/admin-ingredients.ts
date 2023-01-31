import {
	AdminIngredientsRequest,
	AdminIngredientsResponse,
} from "@wasp/shared/types/queries";
import { Prisma } from "@prisma/client";

export function notEmpty<TValue>(
	value: TValue | null | undefined,
): value is TValue {
	return value !== null && value !== undefined;
}

function uniq(a: string[]) {
	return a.sort().filter(function (item, pos, ary) {
		return !pos || item != ary[pos - 1];
	});
}

export const adminIngredients = async (
	args: AdminIngredientsRequest,
	context: any,
): Promise<AdminIngredientsResponse> => {
	const delegate = context.entities
		.RecipeIngredient as Prisma.RecipeIngredientDelegate<{}>;
	const ingredientNameDelegate = context.entities
		.IngredientName as Prisma.IngredientNameDelegate<{}>;

	if (args.search) {
		const ingredients = await delegate.findMany({
			where: {
				name: {
					contains: args.search,
					mode: "insensitive",
				},
			},
		});

		const ingredientNames = ingredients.map((i) => i.name).filter(notEmpty);

		return {
			ingredients: await Promise.all(
				uniq(ingredientNames).map(async (name) => ({
					name,
					count: undefined,
					ingredient: (
						await ingredientNameDelegate.findUnique({
							where: {
								name: name,
							},
							select: {
								ingredient: {
									select: {
										food: {
											select: {
												description: true,
												measurements: true,
											},
										},
									},
								},
							},
						})
					)?.ingredient?.food.description,
				})),
			),
		};
	}

	const recipeIngredients = await delegate.groupBy({
		by: ["name"],
		orderBy: {
			_count: {
				name: "desc",
			},
		},
		_count: true,
		take: 100,
	});

	const ingredients = await Promise.all(
		recipeIngredients.map(async (i) => {
			if (!i.name) {
				return;
			}

			const ingredient = await ingredientNameDelegate.findUnique({
				where: {
					name: i.name,
				},
				select: {
					ingredient: {
						select: {
							food: true,
						},
					},
				},
			});

			return {
				name: i.name,
				count: i._count,
				ingredient: ingredient?.ingredient?.food.description,
			};
		}),
	);

	return {
		ingredients: ingredients.filter(notEmpty),
	};
};
