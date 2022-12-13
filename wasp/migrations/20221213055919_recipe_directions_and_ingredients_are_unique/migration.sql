/*
  Warnings:

  - A unique constraint covering the columns `[recipeId,sequence]` on the table `RecipeDirection` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[recipeId,sequence]` on the table `RecipeIngredient` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RecipeDirection_recipeId_sequence_key" ON "RecipeDirection"("recipeId", "sequence");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeIngredient_recipeId_sequence_key" ON "RecipeIngredient"("recipeId", "sequence");
