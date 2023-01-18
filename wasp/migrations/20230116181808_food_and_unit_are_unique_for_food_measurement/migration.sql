/*
  Warnings:

  - A unique constraint covering the columns `[foodId,foodUnitId]` on the table `FoodMeasurement` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FoodMeasurement_foodId_foodUnitId_key" ON "FoodMeasurement"("foodId", "foodUnitId");
