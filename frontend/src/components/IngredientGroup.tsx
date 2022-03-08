import { Recipe_Ingredients, Recipe_Ingredient_Groups } from 'src/generated/graphql';
import { ListGroup } from 'react-bootstrap';
import React from 'react';
import FoodCandidateList from './FoodCandidateList/FoodCandidateList';
import { IngredientGroupItem } from './IngredientGroupItem';

interface IngredientGroupProps {
  ingredientGroup: Recipe_Ingredient_Groups;
  reloadRecipe: () => void;
  callbacks: {
    setTimestamp: React.Dispatch<number>;
  }
}


export const IngredientGroup: React.FunctionComponent<IngredientGroupProps> = ({ ingredientGroup, reloadRecipe, callbacks }) => {
  const getIngredientConversion = (ingredient: Recipe_Ingredients) => {
    return ingredient.recipe_ingredient_food_candidates.length
      ? ingredient.recipe_ingredient_food_candidates.map((food_candidate) => {
        const portion = food_candidate.food_portion;
        if (!portion) {
          console.error(`portion is null for ${food_candidate}`);
          return null;
        }
        return (
          <>
            &nbsp;- ({food_candidate.food.description}
            , {portion.gram_weight}g = {portion.amount}
            {
              portion.measure_unit && portion.measure_unit.name !== 'undetermined'
                ? portion.measure_unit.name
                : (<>{portion.portion_description} {portion.modifier}</>)
            })
          </>
        )
      })
      : <FoodCandidateList id={ingredient.id} selectedCallback={reloadRecipe} />
  };

  return (
    <>
      <h5>{ingredientGroup.name}</h5>
      <ListGroup>
        {ingredientGroup.group_ingredients.map((ingredient, idx) => (<IngredientGroupItem key={ingredient.id} ingredient={ingredient} callbacks={callbacks} />))}
      </ListGroup>
    </>
  )
}
