import {
	ListRecipesRequest,
	ListRecipesResponse,
} from "@wasp/shared/types/queries";
import { Prisma } from "@prisma/client";

export const listRecipes = async (
	args: ListRecipesRequest,
	context: any,
): Promise<ListRecipesResponse> => {
	const delegate = context.entities.Recipe as Prisma.RecipeDelegate<{}>;

	const cursor = args.cursor
		? {
				cursor: {
					id: args.cursor,
				},
		  }
		: undefined;

	const getIngredientFilter = () => {
		if (!args.ingredients || args.ingredients.length === 0) {
			return {};
		}
		return {
			recipeIngredients: {
				some: {
					AND: args.ingredients.map((i) => ({ text: { contains: i } })),
				},
			},
		};
	};

	const recipes = await delegate.findMany({
		...cursor,
		take: 20,
		select: {
			id: true,
			name: true,
			source: true,
			imageUrl: true,
		},
		where: {
			AND: {
				source: args.source
					? {
							name: {
								equals: args.source,
							},
					  }
					: undefined,
				OR: {
					name: {
						mode: "insensitive",
						contains: args.search,
					},
					...getIngredientFilter(),
				},
			},
		},
		orderBy: {
			id: "asc",
		},
	});

	return {
		recipes,
	};
};
