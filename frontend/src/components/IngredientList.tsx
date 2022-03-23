import React from 'react';
import { Col } from 'react-bootstrap';
import { gql } from '@apollo/client';
import { Recipe_Ingredient_Groups } from '../generated/graphql';
import { IngredientGroup } from './IngredientGroup';

const INSERT_INGREDIENT_VIDEO_TIMESTAMP = gql`
mutation UpsertIngredientVideoTimestamp($id: Int_comparison_exp, $video_timestamp: Int, $video_timestamp_end: Int) {
  update_recipe_ingredients(where: {id: $id}, _set: {video_timestamp: $video_timestamp, video_timestamp_end: $video_timestamp_end}) {
    affected_rows
  }
}
`;

interface IngredientListProps {
  ingredientGroups: Recipe_Ingredient_Groups[];
}

export const IngredientList: React.FunctionComponent<IngredientListProps> = ({ ingredientGroups }) => {
  return (
    <>
      {ingredientGroups.map((ingredient_group) => (
        <Col sm key='recipe-ingredient-group'>
          <IngredientGroup ingredientGroup={ingredient_group} />
        </Col>
      ))}
    </>
  )
}
