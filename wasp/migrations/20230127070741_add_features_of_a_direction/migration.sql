-- CreateTable
CREATE TABLE "DirectionIngredient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "recipeIngredientId" TEXT,
    "recipeDirectionId" TEXT NOT NULL,

    CONSTRAINT "DirectionIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DirectionMeasurement" (
    "id" TEXT NOT NULL,
    "text" TEXT,
    "recipeDirectionId" TEXT NOT NULL,

    CONSTRAINT "DirectionMeasurement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DirectionAction" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "recipeDirectionId" TEXT NOT NULL,

    CONSTRAINT "DirectionAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DirectionEquipment" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "recipeDirectionId" TEXT NOT NULL,

    CONSTRAINT "DirectionEquipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DirectionDuration" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "recipeDirectionId" TEXT NOT NULL,

    CONSTRAINT "DirectionDuration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DirectionTemperature" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "recipeDirectionId" TEXT NOT NULL,

    CONSTRAINT "DirectionTemperature_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DirectionIngredient_id_key" ON "DirectionIngredient"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DirectionMeasurement_id_key" ON "DirectionMeasurement"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DirectionAction_id_key" ON "DirectionAction"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DirectionEquipment_id_key" ON "DirectionEquipment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DirectionDuration_id_key" ON "DirectionDuration"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DirectionTemperature_id_key" ON "DirectionTemperature"("id");

-- AddForeignKey
ALTER TABLE "DirectionIngredient" ADD CONSTRAINT "DirectionIngredient_recipeIngredientId_fkey" FOREIGN KEY ("recipeIngredientId") REFERENCES "RecipeIngredient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectionIngredient" ADD CONSTRAINT "DirectionIngredient_recipeDirectionId_fkey" FOREIGN KEY ("recipeDirectionId") REFERENCES "RecipeDirection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectionMeasurement" ADD CONSTRAINT "DirectionMeasurement_recipeDirectionId_fkey" FOREIGN KEY ("recipeDirectionId") REFERENCES "RecipeDirection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectionAction" ADD CONSTRAINT "DirectionAction_recipeDirectionId_fkey" FOREIGN KEY ("recipeDirectionId") REFERENCES "RecipeDirection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectionEquipment" ADD CONSTRAINT "DirectionEquipment_recipeDirectionId_fkey" FOREIGN KEY ("recipeDirectionId") REFERENCES "RecipeDirection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectionDuration" ADD CONSTRAINT "DirectionDuration_recipeDirectionId_fkey" FOREIGN KEY ("recipeDirectionId") REFERENCES "RecipeDirection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectionTemperature" ADD CONSTRAINT "DirectionTemperature_recipeDirectionId_fkey" FOREIGN KEY ("recipeDirectionId") REFERENCES "RecipeDirection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
