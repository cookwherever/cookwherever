import HttpError from "@wasp/core/HttpError.js";
import {
	ViewRecipeRequest,
	ViewRecipeResponse,
} from "@wasp/shared/types/queries";
import { Prisma } from "@prisma/client";

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
			recipeDirections: {
				select: {
					id: true,
					recipeId: true,
					sequence: true,
					text: true,
					formattedText: true,
					ingredients: {
						select: {
							name: true,
							ingredient: {
								select: {
									text: true,
								},
							},
						},
					},
					measurements: true,
					equipment: true,
					actions: true,
					durations: true,
				},
			},
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
											mass: true,
										},
									},
								},
							},
						},
					},
				},
			},
		},
		where: {
			id: args.id,
		},
	});

	if (!recipe) {
		throw new HttpError(404, "recipe not found");
	}

	const measuredIngredients = recipe.recipeIngredients
		.map((ingredient) => {
			const ingredientUnit = ingredient.unit;
			const ingredientAmount = ingredient.amount;
			const unitGramCoefficient = ingredientUnit?.gramCoefficient;
			const foodIngredient = ingredient.ingredient;

			const lookup: Record<string, number> = {
				pound: 453.5924,
			};

			if (ingredientUnit?.name && lookup[ingredientUnit.name]) {
				const modifier = lookup[ingredientUnit.name];

				if (!ingredient.amount) {
					return ingredient;
				}

				return {
					...ingredient,
					calculatedMass: modifier * ingredient.amount,
				};
			}

			if (!ingredientUnit || !ingredientAmount || !unitGramCoefficient) {
				console.log("cannot create ingredient measurement", {
					ingredient,
				});
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

				const measurement = food.measurements.find(
					(m) => m.unit.name === ingredientUnit.name,
				);
				if (measurement) {
					return measurement;
				}
				return food.measurements[0];
			};

			const measurement = findMeasurement();
			const measurementGramCoeff = measurement?.unit.gramCoefficient;
			if (!measurement || !measurementGramCoeff) {
				return ingredient;
			}

			// ingredient: 2 garlic cloves
			// food: 1 garlic clove == 3 grams

			// ingredient: 3 tbsp flour
			// food: 1 cup flour == 100 grams

			console.log(
				`${ingredientAmount} * ${unitGramCoefficient} / ${measurement.amount} * ${measurementGramCoeff} * ${measurement.mass}`,
			);

			const calculatedMass =
				((measurement.amount * measurementGramCoeff) /
					(ingredientAmount * unitGramCoefficient)) *
				measurement.mass;
			return {
				...ingredient,
				calculatedMass,
			};
		})
		.map((i) => ({
			...i,
			ingredient: undefined,
		}));

	return {
		recipe: {
			...recipe,
			recipeIngredients: measuredIngredients,
		},
	};
};
