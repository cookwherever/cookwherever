export interface CreateRecipeIngredient {
	text: string;
}

export interface CreateRecipeDirection {
	text: string;
}

export interface CreateRecipeRequest {
	name: string;
	source: string;
	sourcePath: string;
	imageUrl: string;
	ingredients: CreateRecipeIngredient[];
	directions: CreateRecipeDirection[];
}

export interface CreateRecipeResponse {
	id: string;
}

export interface UpdateRecipeRequest extends CreateRecipeRequest {
	id: string;
}

export interface UpdateRecipeResponse {
	count: number;
}
