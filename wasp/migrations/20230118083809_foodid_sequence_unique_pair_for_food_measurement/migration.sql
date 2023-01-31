/*
  Warnings:

  - A unique constraint covering the columns `[foodId,sequence]` on the table `FoodMeasurement` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sequence` to the `FoodMeasurement` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "FoodMeasurement_foodId_foodUnitId_key";

-- AlterTable
ALTER TABLE "FoodMeasurement" ADD COLUMN     "sequence" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FoodMeasurement_foodId_sequence_key" ON "FoodMeasurement"("foodId", "sequence");
