import React from 'react';
import { Col } from 'react-bootstrap';
import { Recipe_Ingredient_Groups } from '../generated/graphql';
import { IngredientGroup } from './IngredientGroup';

interface IngredientListProps {
  ingredientGroups: Recipe_Ingredient_Groups[];
  reloadRecipe: () => void;
  callbacks: {
    setTimestamp: React.Dispatch<number>;
  }
}

export const IngredientList: React.FunctionComponent<IngredientListProps> = ({ ingredientGroups, reloadRecipe, callbacks }) => {
  return (
    <>
      {ingredientGroups.map((ingredient_group) => (
        <Col sm key='recipe-ingredient-group'>
          <IngredientGroup callbacks={callbacks} ingredientGroup={ingredient_group} reloadRecipe={reloadRecipe} />
        </Col>
      ))}
    </>
  )
}
