// types copied from wasp/.wasp/out/server/node_modules/.prisma/client/index.d.ts

export type Source = {
	id: string;
	name: string;
	url: string | null;
};

type DirectionIngredient = {
	name: string;
	ingredient?: {
		text: string;
	} | null;
};

type DirectionMeasurement = {
	text: string | null;
};

type DirectionEquipment = {
	text: string;
};

type DirectionAction = {
	text: string;
};

type DirectionDuration = {
	text: string;
};

export type RecipeDirection = {
	id: string;
	sequence: number;
	formattedText?: string | null;
	text: string;
	recipeId: string | null;
	ingredients: DirectionIngredient[];
	measurements: DirectionMeasurement[];
	equipment: DirectionEquipment[];
	actions: DirectionAction[];
	durations: DirectionDuration[];
};

export type FoodUnit = {
	name: string;
	gramCoefficient: number | null;
};

export type FoodMeasurement = {
	amount: number;
	unit: FoodUnit;
	comment?: string | null;
	mass: number;
};

export type Food = {
	description: string;
	measurements: FoodMeasurement[];
};

export type Ingredient = {
	food: Food;
};

export type RecipeIngredient = {
	id: string;
	sequence: number;
	text: string;
	name: string | null;
	amount: number | null;
	comment: string | null;
	unit: FoodUnit | null;
	calculatedMass?: number;
};

export type Recipe = {
	id: string;
	createdAt: Date;
	updatedAt: Date | null;
	name: string;
	sourcePath: string;
	imageUrl: string | null;
	videoUrl: string | null;
	userId: string;
	sourceId: string;
	source: Source;
	recipeDirections: RecipeDirection[];
	recipeIngredients: RecipeIngredient[];
};

export interface ListRecipesRecipe {
	id: string;
	name: string;
	source: Source;
	imageUrl: string | null;
}
