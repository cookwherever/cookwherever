/*
  Warnings:

  - A unique constraint covering the columns `[name,sourcePath]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Recipe_name_sourceId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_name_sourcePath_key" ON "Recipe"("name", "sourcePath");
