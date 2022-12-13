import React from 'react';
import {ListRecipesRecipe} from "@wasp/shared/types/recipe";
import {Link} from "react-router-dom";

interface Props {
  recipes: ListRecipesRecipe[]
}

const RecipeList: React.FC<Props> = ({ recipes }) => {
  if (!recipes.length) {
    return (
      <p>'No recipes'</p>
    )
  }
  return (
    <ul>
      <li>{recipes.map((recipe, idx) => <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>)}</li>
    </ul>
  )
}

export default RecipeList;
