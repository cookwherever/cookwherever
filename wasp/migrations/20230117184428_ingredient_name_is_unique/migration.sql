/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `IngredientName` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "IngredientName_name_key" ON "IngredientName"("name");
