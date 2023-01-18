-- CreateTable
CREATE TABLE "FoodMeasurement" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "mass" DOUBLE PRECISION NOT NULL,
    "foodUnitId" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,

    CONSTRAINT "FoodMeasurement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Food" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "fdcId" INTEGER,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FoodMeasurement_id_key" ON "FoodMeasurement"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Food_id_key" ON "Food"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Food_description_key" ON "Food"("description");

-- AddForeignKey
ALTER TABLE "FoodMeasurement" ADD CONSTRAINT "FoodMeasurement_foodUnitId_fkey" FOREIGN KEY ("foodUnitId") REFERENCES "FoodUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodMeasurement" ADD CONSTRAINT "FoodMeasurement_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
