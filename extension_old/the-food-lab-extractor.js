let recipe = null;
const recipes = [];
const recipeParts = document.querySelectorAll('.Recipe_RT1, .Recipe_I, .Recipe_RSteps-1, .Recipe_RSteps, .Recipe_RVH');
for (let i = 0; i < recipeParts.length; i += 1) {
  const recipePart = recipeParts[i];
  if (recipePart.className == 'Recipe_RVH') {
    if (recipe == null) continue;
    recipes.push(recipe);
    recipe = null;
  }
  if (recipePart.className == 'Recipe_RT1') {
    if (recipe != null) {
      recipes.push(recipe);
    }

    recipe = {
      name: recipePart.textContent,
      source: 'The Food Lab',
      ingredients: [],
      directions: []
    };
  }
  if (recipe === null) continue;

  if (recipePart.className == 'Recipe_I') {
    recipe.ingredients.push(recipePart.textContent);
  }
  if (recipeParts[i].className.indexOf('Recipe_RSteps') != -1) {
    recipe.directions.push(recipePart.textContent.replace(/(\d)\.(\s+)/g, ''));
  }
}
recipes;