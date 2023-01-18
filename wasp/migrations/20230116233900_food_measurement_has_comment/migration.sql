/*
  Warnings:

  - You are about to drop the column `comment` on the `FoodUnit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FoodMeasurement" ADD COLUMN     "comment" TEXT;

-- AlterTable
ALTER TABLE "FoodUnit" DROP COLUMN "comment";
