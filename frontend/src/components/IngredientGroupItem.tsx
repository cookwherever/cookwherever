import React, {useState} from 'react';
import { Col, ListGroup, Row, Form } from 'react-bootstrap';
import { Recipe_Ingredients } from '../generated/graphql';
import FoodCandidateList from "./FoodCandidateList/FoodCandidateList";
import {useRecoilState, useRecoilValue} from "recoil";
import {viewModeState} from "../recoil/atoms/auth";
import {recipeViewerState} from "../recoil/atoms/recipe";

interface IngredientGroupItemProps {
  ingredient: Recipe_Ingredients
}

export const IngredientGroupItem: React.FunctionComponent<IngredientGroupItemProps> = ({ ingredient }) => {
  const [markAsPrepped, setMarkAsPrepped] = useState<boolean>(false);

  const viewMode = useRecoilValue(viewModeState);
  const developerMode = viewMode === 'developer';

  const [recipeState, setRecipeState] = useRecoilState(recipeViewerState);

  const getIngredientConversion = () => {
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
      : <FoodCandidateList id={ingredient.id} selectedCallback={() => { console.log('TODO reload recipe') }} />
  };


  const lookup: Record<string, number> = {
    teaspoon: 1,
    tablespoon: 3,
    cup: 4 * 4 * 3,
  };

  const getNormalized = () => {
    if (ingredient.amount && ingredient.units) {
      const modifier = lookup[ingredient.units];
      return ingredient.amount / modifier;
    }
    return -1;
  }

  const doSetTimestamp = () => {
    if (!ingredient.video_timestamp) return;
    setRecipeState({
      ...recipeState,
      currentRecipeStep: {
        timestamp: ingredient.video_timestamp
      }
    });
  }

  const ingredientText = (<div style={markAsPrepped ? {textDecoration: 'line-through', cursor: 'pointer'} : {cursor: 'pointer'}}>{ingredient.text}</div>);

  const getDeveloperInfo = () => {
    return (
      <>
        <Row>
          <Col md={12}>
            Parsed: {ingredient.amount} {ingredient.units} {ingredient.name} {ingredient.comment}
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            Normalized: {getNormalized()}
          </Col>
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
