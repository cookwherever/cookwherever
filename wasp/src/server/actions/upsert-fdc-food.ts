import {
	UpsertFdcFoodRequest,
	UpsertFdcFoodResponse,
} from "@wasp/shared/types/actions";
import { Prisma } from "@prisma/client";
import WinkNLP from "wink-nlp";
import model from "wink-eng-lite-web-model";

const nlp = WinkNLP(model);

export const upsertFdcFood = async (
	args: UpsertFdcFoodRequest,
	context: any,
): Promise<UpsertFdcFoodResponse> => {
	const delegate = context.entities.Food as Prisma.FoodDelegate<{}>;

	const processedDescription = nlp.readDoc(args.description);

	const foodDescription = processedDescription.out(nlp.its.lemma);

	const existingFood = await delegate.findFirst({
		where: {
			OR: {
				fdcId: args.fdcId,
				description: foodDescription,
			},
		},
	});

	const formatUnit = (
		name: string,
		comment: string,
	): { name: string; comment: string; gramCoef: number | undefined } => {
		const unitParts = name.split(", ");
		let formattedUnitName = unitParts[0];
		const formattedComment = comment + ", " + unitParts.slice(1).join(", ");
		const lookup: Record<string, string> = {
			teaspoon: "tsp",
			tablespoon: "tbsp",
		};

		formattedUnitName = lookup[formattedUnitName] || formattedUnitName;

		const gramCoefLookup: Record<string, number> = {
			tsp: 1,
			tbsp: 1 / 3,
			cup: 1 / 48,
			clove: 1,
		};

		return {
			name: formattedUnitName.toLowerCase(),
			comment: formattedComment,
			gramCoef: gramCoefLookup[formattedUnitName],
		};
	};

	if (existingFood) {
		const upsertFood: Prisma.FoodUpdateArgs = {
			where: {
				id: existingFood.id,
			},
			data: {
				description: foodDescription,
				measurements: {
					connectOrCreate: await Promise.all(
						args.portions.map(
							async (
								portion,
							): Promise<Prisma.FoodMeasurementCreateOrConnectWithoutFoodInput> => {
								const d = context.entities
									.FoodUnit as Prisma.FoodUnitDelegate<{}>;

								const unitName = portion.unit.name || "unknown";
								const formatted = formatUnit(unitName, portion.unit.comment);

								const unit = await d.upsert({
									where: {
										name: formatted.name,
									},
									update: {
										gramCoefficient: formatted.gramCoef,
									},
									create: {
										name: formatted.name,
										gramCoefficient: formatted.gramCoef,
									},
								});

								return {
									where: {
										foodId_sequence: {
											foodId: existingFood.id,
											sequence: portion.sequence,
										},
									},
									create: {
										sequence: portion.sequence,
										amount: portion.amount,
										mass: portion.mass,
										comment: formatted.comment,
										unit: {
											connect: {
												id: unit.id,
											},
										},
									},
								};
							},
						),
					),
				},
			},
		};
		const updatedFood = await delegate.update(upsertFood);
		return {
			id: updatedFood.id,
		};
	} else {
		const createInput: Prisma.FoodCreateInput = {
			fdcId: args.fdcId,
			description: foodDescription,
			measurements: {
				create: await Promise.all(
					args.portions.map(
						async (
							portion,
						): Promise<Prisma.FoodMeasurementCreateWithoutFoodInput> => {
							const d = context.entities
								.FoodUnit as Prisma.FoodUnitDelegate<{}>;

							const unitName = portion.unit.name;
							const comment = portion.unit.comment;

							const formatted = formatUnit(unitName, comment);

							// TODO (cthompson) normalize unit name: tsp == teaspoon

							return {
								sequence: portion.sequence,
								amount: portion.amount,
								mass: portion.mass,
								comment: formatted.comment,
								unit: {
									connectOrCreate: {
										where: {
											name: formatted.name,
										},
										create: {
											name: formatted.name,
											gramCoefficient: formatted.gramCoef,
										},
									},
								},
							};
						},
					),
				),
			},
		};
		const upsertFood: Prisma.FoodUpsertArgs = {
			where: {
				description: foodDescription,
			},
			update: createInput,
			create: createInput,
		};
		const createdFood = await delegate.upsert(upsertFood);
		return {
			id: createdFood.id,
		};
	}
};
