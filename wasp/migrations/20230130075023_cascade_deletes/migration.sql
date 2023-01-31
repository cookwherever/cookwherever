-- DropForeignKey
ALTER TABLE "DirectionAction" DROP CONSTRAINT "DirectionAction_recipeDirectionId_fkey";

-- DropForeignKey
ALTER TABLE "DirectionDuration" DROP CONSTRAINT "DirectionDuration_recipeDirectionId_fkey";

-- DropForeignKey
ALTER TABLE "DirectionEquipment" DROP CONSTRAINT "DirectionEquipment_recipeDirectionId_fkey";

-- DropForeignKey
ALTER TABLE "DirectionIngredient" DROP CONSTRAINT "DirectionIngredient_recipeDirectionId_fkey";

-- DropForeignKey
ALTER TABLE "DirectionIngredient" DROP CONSTRAINT "DirectionIngredient_recipeIngredientId_fkey";

-- DropForeignKey
ALTER TABLE "DirectionMeasurement" DROP CONSTRAINT "DirectionMeasurement_recipeDirectionId_fkey";

-- DropForeignKey
ALTER TABLE "DirectionTemperature" DROP CONSTRAINT "DirectionTemperature_recipeDirectionId_fkey";

-- DropForeignKey
ALTER TABLE "FoodMeasurement" DROP CONSTRAINT "FoodMeasurement_foodUnitId_fkey";

-- AddForeignKey
ALTER TABLE "FoodMeasurement" ADD CONSTRAINT "FoodMeasurement_foodUnitId_fkey" FOREIGN KEY ("foodUnitId") REFERENCES "FoodUnit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectionIngredient" ADD CONSTRAINT "DirectionIngredient_recipeIngredientId_fkey" FOREIGN KEY ("recipeIngredientId") REFERENCES "RecipeIngredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectionIngredient" ADD CONSTRAINT "DirectionIngredient_recipeDirectionId_fkey" FOREIGN KEY ("recipeDirectionId") REFERENCES "RecipeDirection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectionMeasurement" ADD CONSTRAINT "DirectionMeasurement_recipeDirectionId_fkey" FOREIGN KEY ("recipeDirectionId") REFERENCES "RecipeDirection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectionAction" ADD CONSTRAINT "DirectionAction_recipeDirectionId_fkey" FOREIGN KEY ("recipeDirectionId") REFERENCES "RecipeDirection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectionEquipment" ADD CONSTRAINT "DirectionEquipment_recipeDirectionId_fkey" FOREIGN KEY ("recipeDirectionId") REFERENCES "RecipeDirection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectionDuration" ADD CONSTRAINT "DirectionDuration_recipeDirectionId_fkey" FOREIGN KEY ("recipeDirectionId") REFERENCES "RecipeDirection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectionTemperature" ADD CONSTRAINT "DirectionTemperature_recipeDirectionId_fkey" FOREIGN KEY ("recipeDirectionId") REFERENCES "RecipeDirection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
