import HttpError from "@wasp/core/HttpError.js";
import {
	CreateRecipeRequest,
	CreateRecipeResponse,
} from "@wasp/shared/types/actions";
import { Prisma } from "@prisma/client";
import * as util from "util";
import parseDirections from "@wasp/actions/parseDirections.js";
import WinkNLP from "wink-nlp";
import model from "wink-eng-lite-web-model";

const nlp = WinkNLP(model);

export function notEmpty<TValue>(
	value: TValue | null | undefined,
): value is TValue {
	return value !== null && value !== undefined;
}

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
				sourcePath: args.sourcePath,
			},
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
			creator: { connect: { id: context.user.id } },
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
			creator: { connect: { id: context.user.id } },
		},
	};

	const delegate = context.entities.Recipe as Prisma.RecipeDelegate<{}>;
	const createdRecipe = await delegate.upsert(prismaCreateRecipe);

	// Insert ingredients
	const insertedIngredients = await Promise.all(
		args.ingredients.map(async (ingredient, idx) => {
			const d = context.entities.FoodUnit as Prisma.FoodUnitDelegate<{}>;
			const ingredientNameDelegate = context.entities
				.IngredientName as Prisma.IngredientNameDelegate<{}>;

			const processedIngredientName = ingredient.name
				? nlp.readDoc(ingredient.name)
				: undefined;

			const normalizedIngName = processedIngredientName?.out(nlp.its.lemma);

			const createUnit = async (): Promise<
				Prisma.FoodUnitCreateNestedOneWithoutRecipeIngredientInput | undefined
			> => {
				if (!ingredient.unit) {
					return undefined;
				}

				return {
					connectOrCreate: {
						where: {
							name: ingredient.unit,
						},
						create: {
							name: ingredient.unit,
						},
					},
				};
			};

			const connectIngredient = async (): Promise<
				Prisma.IngredientCreateNestedOneWithoutRecipeIngredientInput | undefined
			> => {
				if (!normalizedIngName) {
					return undefined;
				}

				const ingredientName = await ingredientNameDelegate.findUnique({
					where: {
						name: normalizedIngName,
					},
					select: {
						ingredientId: true,
					},
				});

				const ingredientId = ingredientName?.ingredientId;
				if (!ingredientId) {
					return undefined;
				}
				return {
					connect: {
						id: ingredientId,
					},
				};
			};

			// TODO (cthompson) search IngredientName for names that match the ingredient and associate
			const createUpdate: Prisma.RecipeIngredientCreateInput = {
				sequence: idx,
				text: ingredient.text,
				name: normalizedIngName,
				amount: ingredient.amount,
				comment: ingredient.comment,
				ingredient: await connectIngredient(),
				Recipe: {
					connect: {
						id: createdRecipe.id,
					},
				},
				unit: await createUnit(),
			};
			const recipeIngredientCreateArgs: Prisma.RecipeIngredientUpsertArgs = {
				where: {
					recipeId_sequence: {
						recipeId: createdRecipe.id,
						sequence: idx,
					},
				},
				create: createUpdate,
				update: createUpdate,
				select: {
					id: true,
				},
			};

			const delegate = context.entities
				.RecipeIngredient as Prisma.RecipeIngredientDelegate<{}>;

			try {
				const insertedIngredient = await delegate.upsert(
					recipeIngredientCreateArgs,
				);
				return {
					name: normalizedIngName,
					id: insertedIngredient.id,
				};
			} catch (e) {
				console.log("failed to upsert recipe ingredient", {
					recipeIngredientCreateArgs: util.inspect(recipeIngredientCreateArgs),
				});
				throw e;
			}
		}),
	);

	// Parse and insert directions
	const parsedDirections = await parseDirections({
		directions: args.directions.map((d) => d.text),
		ingredients: args.ingredients.map((i) => i.name).filter(notEmpty),
	});

	await Promise.all(
		parsedDirections.directions.map(async (parsedDirection, idx) => {
			const createUpdate: Prisma.RecipeDirectionCreateInput = {
				sequence: idx,
				text: parsedDirection.originalText,
				formattedText: parsedDirection.text,
				Recipe: {
					connect: {
						id: createdRecipe.id,
					},
				},
			};
			const recipeDirectionUpsertArgs: Prisma.RecipeDirectionUpsertArgs = {
				where: {
					recipeId_sequence: {
						recipeId: createdRecipe.id,
						sequence: idx,
					},
				},
				create: createUpdate,
				update: createUpdate,
				select: {
					id: true,
				},
			};
			const delegate = context.entities
				.RecipeDirection as Prisma.RecipeDirectionDelegate<{}>;
			const direction = await delegate.upsert(recipeDirectionUpsertArgs);

			// Delete all direction metadata and re-insert it.
			// It does not seem possible to upsert here.
			const directionIngredient = context.entities
				.DirectionIngredient as Prisma.DirectionIngredientDelegate<{}>;
			await directionIngredient.deleteMany({
				where: {
					recipeDirectionId: direction.id,
				},
			});

			await Promise.all(
				parsedDirection.ingredients.map(async (ingredient) => {
					const recipeIngredient = insertedIngredients.filter(
						(ing) => ingredient === ing.name,
					);
					await directionIngredient.create({
						data: {
							recipeDirectionId: direction.id,
							recipeIngredientId:
								recipeIngredient.length > 0
									? recipeIngredient[0].id
									: undefined,
							name: ingredient,
						},
					});
				}),
			);

			const directionMeasurement = context.entities
				.DirectionMeasurement as Prisma.DirectionMeasurementDelegate<{}>;
			await directionMeasurement.deleteMany({
				where: {
					recipeDirectionId: direction.id,
				},
			});

			await Promise.all(
				parsedDirection.measurements.map(async (measurement) => {
					await directionMeasurement.create({
						data: {
							recipeDirectionId: direction.id,
							text: measurement,
						},
					});
				}),
			);

			const directionAction = context.entities
				.DirectionAction as Prisma.DirectionActionDelegate<{}>;
			await directionAction.deleteMany({
				where: {
					recipeDirectionId: direction.id,
				},
			});

			await Promise.all(
				parsedDirection.actions.map(async (action) => {
					await directionAction.create({
						data: {
							recipeDirectionId: direction.id,
							text: action,
						},
					});
				}),
			);

			const directionEquipment = context.entities
				.DirectionEquipment as Prisma.DirectionEquipmentDelegate<{}>;
			await directionEquipment.deleteMany({
				where: {
					recipeDirectionId: direction.id,
				},
			});

			await Promise.all(
				parsedDirection.equipment.map(async (equipment) => {
					await directionEquipment.create({
						data: {
							recipeDirectionId: direction.id,
							text: equipment,
						},
					});
				}),
			);

			const directionDuration = context.entities
				.DirectionDuration as Prisma.DirectionDurationDelegate<{}>;
			await directionDuration.deleteMany({
				where: {
					recipeDirectionId: direction.id,
				},
			});

			await Promise.all(
				parsedDirection.durations.map(async (duration) => {
					await directionDuration.create({
						data: {
							recipeDirectionId: direction.id,
							text: duration,
						},
					});
				}),
			);

			const directionTemperature = context.entities
				.DirectionTemperature as Prisma.DirectionTemperatureDelegate<{}>;
			await directionTemperature.deleteMany({
				where: {
					recipeDirectionId: direction.id,
				},
			});

			await Promise.all(
				parsedDirection.temperatures.map(async (temperature) => {
					await directionTemperature.create({
						data: {
							recipeDirectionId: direction.id,
							text: temperature,
						},
					});
				}),
			);
		}),
	);

	return {
		id: createdRecipe.id,
	};
};
