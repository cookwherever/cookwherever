import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { gql } from '@apollo/client';
import { Recipe_Ingredient_Groups } from '../generated/graphql.tsx.bak';
import { IngredientGroup } from './IngredientGroup';
import { inputChangeHandler } from '../utils/hook-helpers';

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
  const [recipeYield, setRecipeYield] = useState('1');

  return (
    <>
      <Row>
        {ingredientGroups.map((ingredient_group, idx) => (
          <Col sm key={`recipe-ingredient-group-${idx}`}>
            <IngredientGroup ingredientGroup={ingredient_group} />
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Yield</Form.Label>
            <Form.Control onChange={inputChangeHandler(setRecipeYield)} value={recipeYield} type="text" />
          </Form.Group>
        </Col>
      </Row>
    </>
  )
}
