-- AlterTable
ALTER TABLE "RecipeIngredient" ADD COLUMN     "amount" DOUBLE PRECISION,
ADD COLUMN     "comment" TEXT,
ADD COLUMN     "foodUnitId" TEXT,
ADD COLUMN     "name" TEXT;

-- CreateTable
CREATE TABLE "FoodUnit" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gramCoefficient" DOUBLE PRECISION,

    CONSTRAINT "FoodUnit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FoodUnit_id_key" ON "FoodUnit"("id");

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_foodUnitId_fkey" FOREIGN KEY ("foodUnitId") REFERENCES "FoodUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
