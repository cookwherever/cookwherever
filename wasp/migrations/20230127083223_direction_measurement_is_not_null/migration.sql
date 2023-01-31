/*
  Warnings:

  - Made the column `text` on table `DirectionMeasurement` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "DirectionMeasurement" ALTER COLUMN "text" SET NOT NULL;
