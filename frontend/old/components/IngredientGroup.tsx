import { Recipe_Ingredient_Groups } from 'src/generated/graphql.tsx.bak';
import { ListGroup } from 'react-bootstrap';
import React from 'react';
import { IngredientGroupItem } from './IngredientGroupItem';

interface IngredientGroupProps {
  ingredientGroup: Recipe_Ingredient_Groups;
}


export const IngredientGroup: React.FunctionComponent<IngredientGroupProps> = ({ ingredientGroup }) => {
  return (
    <>
      <h5>{ingredientGroup.name}</h5>
      <ListGroup>
        {ingredientGroup.group_ingredients
          .map(
            (ingredient, idx) => (
              <IngredientGroupItem key={ingredient.id} ingredient={ingredient} />
            ),
          )
        }
      </ListGroup>
    </>
  )
}
