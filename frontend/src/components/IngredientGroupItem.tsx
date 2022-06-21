import React, { useState } from 'react';
import { Col, ListGroup, Row, Form } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Recipe_Ingredients } from '../generated/graphql';
import { viewModeState } from '../recoil/atoms/auth';
import { recipeViewerState } from '../recoil/atoms/recipe';

interface IngredientGroupItemProps {
  ingredient: Recipe_Ingredients
}

export const IngredientGroupItem: React.FunctionComponent<IngredientGroupItemProps> = ({ ingredient }) => {
  const [markAsPrepped, setMarkAsPrepped] = useState<boolean>(false);

  const viewMode = useRecoilValue(viewModeState);
  const developerMode = viewMode === 'developer';

  const [recipeState, setRecipeState] = useRecoilState(recipeViewerState);

  const getIngredientConversion = () => {
    if (!ingredient.ingredient || ingredient.ingredient.length === 0) {
      return null;
    }

    const recipeIngredient = ingredient.ingredient[0];
    const candidate = recipeIngredient.ingredient_food_candidate;
    if (!candidate) {
      console.error(`candidate is null for ${recipeIngredient}`);
      return null;
    }

    const portion = candidate.food_portion;
    if (!portion) {
      console.error(`portion is null for ${candidate}`);
      return null;
    }

    const measureUnit = portion.measure_unit && portion.measure_unit.name !== 'undetermined'
      ? portion.measure_unit.name
      : (portion.portion_description ? `${portion.portion_description} ${portion.modifier}` : `${portion.modifier}`);

    const lookup: Record<string, number> = {
      teaspoon: 1,
      tsp: 1,
      tablespoon: 3,
      tbsp: 3,
      cup: 4 * 4 * 3,
      clove: 1,
    };

    if (!ingredient.amount || !ingredient.units || !measureUnit) {
      return null;
    }

    const modifier = lookup[ingredient.units];
    const normalizedIngredient = ingredient.amount * modifier;

    const foodModifier = lookup[measureUnit];
    const normalizedFood = portion.gram_weight / foodModifier;

    const ingredientMass = normalizedIngredient * normalizedFood;

    return {
      debug: `${candidate.food.description}, ${portion.gram_weight}g = ${portion.amount} ${measureUnit}`,
      mass: ingredientMass,
    }
  };

  const doSetTimestamp = () => {
    if (!ingredient.video_timestamp) return;
    setRecipeState({
      ...recipeState,
      currentRecipeStep: {
        timestamp: ingredient.video_timestamp
      }
    });
  }

  const conversion = getIngredientConversion();

  const ingText = ingredient.text + (conversion ? ` or ${conversion.mass}g` : '');

  const ingredientText = (<div style={markAsPrepped ? { textDecoration: 'line-through', cursor: 'pointer' } : { cursor: 'pointer' }}>{ingText}</div>);

  const getDeveloperInfo = () => {
    return (
      <>
        <Row>
          <Col md={12}>
            Parsed: {ingredient.amount} {ingredient.units} {ingredient.name} {ingredient.comment}
          </Col>
        </Row>
        <Row>
          {conversion && (
            <Col md={12}>
              {conversion.debug}
            </Col>
          )}
        </Row>
      </>
    );
  }

  return (
    <ListGroup.Item key={ingredient.id} onClick={() => setMarkAsPrepped(!markAsPrepped)}>
      <Row>
        {ingredient.video_timestamp ? (
          <>
            <Col md={10}>
              {ingredientText}
            </Col>
            <Col className='fs-3' md={2}>
              <div onClick={doSetTimestamp}><i style={{ cursor: 'pointer' }} className='bi bi-play-circle' /></div>
            </Col>
          </>
        ) : (
          <Col md={12}>
            {ingredientText}
          </Col>
        )}
      </Row>
      { developerMode && getDeveloperInfo() }
    </ListGroup.Item>
  )
}
