/*
  Warnings:

  - A unique constraint covering the columns `[name,sourceId]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Recipe_name_sourceId_key" ON "Recipe"("name", "sourceId");
