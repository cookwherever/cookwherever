export interface CreateRecipeRequest {
  id: string
  name: string
  source: string
  sourcePath: string
  ingredients: string[]
  directions: string[]
}

export interface CreateRecipeResponse {
  id: string
}

export interface UpdateRecipeRequest extends CreateRecipeRequest {
}

export interface UpdateRecipeResponse {
  count: number
}
