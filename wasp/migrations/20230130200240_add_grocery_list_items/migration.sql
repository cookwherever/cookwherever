-- CreateTable
CREATE TABLE "GroceryListItem" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,
    "ingredientId" TEXT,
    "recipeIngredientId" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "GroceryListItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GroceryListItem_id_key" ON "GroceryListItem"("id");

-- CreateIndex
CREATE UNIQUE INDEX "GroceryListItem_recipeIngredientId_key" ON "GroceryListItem"("recipeIngredientId");

-- AddForeignKey
ALTER TABLE "GroceryListItem" ADD CONSTRAINT "GroceryListItem_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroceryListItem" ADD CONSTRAINT "GroceryListItem_recipeIngredientId_fkey" FOREIGN KEY ("recipeIngredientId") REFERENCES "RecipeIngredient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroceryListItem" ADD CONSTRAINT "GroceryListItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
