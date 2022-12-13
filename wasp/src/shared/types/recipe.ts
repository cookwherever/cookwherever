// types copied from wasp/.wasp/out/server/node_modules/.prisma/client/index.d.ts

export type Source = {
  id: string
  name: string
  url: string | null
}

export type RecipeDirection = {
  id: string
  sequence: number
  text: string
  recipeId: string | null
}

export type RecipeIngredient = {
  id: string
  sequence: number
  text: string
  recipeId: string | null
}

export type Recipe = {
  id: string
  createdAt: Date
  updatedAt: Date | null
  name: string
  sourcePath: string
  imageUrl: string | null
  videoUrl: string | null
  userId: string
  sourceId: string
  source: Source
  recipeDirections: RecipeDirection[]
  recipeIngredients: RecipeIngredient[]
}

export interface ListRecipesRecipe {
  name: string,
  source: Source,
}
