-- DropForeignKey
ALTER TABLE "IngredientName" DROP CONSTRAINT "IngredientName_ingredientId_fkey";

-- AlterTable
ALTER TABLE "IngredientName" ALTER COLUMN "ingredientId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "IngredientName" ADD CONSTRAINT "IngredientName_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
