import React, { useState } from 'react'


import { gql, useMutation, useQuery } from '@apollo/client';

import { Col, Row, Container, Button, Form, Badge } from 'react-bootstrap';
import { Recipes } from '../../generated/graphql';
import { getSourceHostname } from '../../utils/format-recipe';
import { VideoPlayer } from '../../components/VideoPlayer';
import { RecipeDirections } from '../../components/RecipeDirections';
import { IngredientList } from '../../components/IngredientList';
import { RecipeOffCanvas } from '../../components/RecipeOffCanvas';

interface ViewRecipePageProps {
  id: number
  match: {
    params: {
      id: string
    }
  }
}

export const QUERY = gql`
  query ViewRecipeQuery($id: Int!) {
    recipes_by_pk(id: $id) {
      id
      name
      created_at
      source
      updated_at
      video
      recipe_ingredient_groups(order_by: { seq_num: asc }) {
        name
        group_ingredients(order_by: { seq_num: asc }) {
          id
          seq_num
          text
          name
          amount 
          comment
          units
          video_timestamp
          recipe_ingredient_food_candidates {
            food_portion {
              gram_weight
              amount
              modifier
              measure_unit {
                name
              }
              portion_description
            }
            food {
              description
            }
          }
        }
      }
      recipe_directions(order_by: { seq_num: asc }) {
        id
        seq_num
        step
        video_timestamp
      }
      recipe_tags(order_by: { seq_num: asc }) {
        name
        id
      }
    }
  }
`

const INSERT_DIRECTION_VIDEO_TIMESTAMP = gql`
mutation UpsertDirectionVideoTimestamp($video_timestamp: Int, $id: Int_comparison_exp) {
  update_recipe_directions(where: {id: $id}, _set: {video_timestamp: $video_timestamp}) {
    affected_rows
  }
}
`

const INSERT_INGREDIENT_VIDEO_TIMESTAMP = gql`
mutation UpsertIngredientVideoTimestamp($id: Int_comparison_exp, $video_timestamp: Int) {
  update_recipe_ingredients(where: {id: $id}, _set: {video_timestamp: $video_timestamp}) {
    affected_rows
  }
}
`;

export interface DirectionVideoStep {
  type: 'direction';
  idx: number;
}

export interface IngredientVideoStep {
  type: 'ingredient';
  group_idx: number;
  ingredient_idx: number;
}

export type VideoStep = DirectionVideoStep | IngredientVideoStep;

export function isDirectionVideoStep(step: VideoStep, type: string, idx: number) {
  if (step.type === 'direction') {
    return step.type === type && step.idx === idx;
  }
  return false;
}

export function isIngredientVideoStep(step: VideoStep, type: string, group_idx: number, ingredient_idx: number) {
  if (step.type === 'ingredient') {
    return step.type === type && step.group_idx === group_idx && step.ingredient_idx === ingredient_idx;
  }
  return false;
}

export const ViewRecipePage: React.FunctionComponent<ViewRecipePageProps> = (props) => {
  const { id } = props.match.params;

  const [timestamp, setTimestamp] = useState<number | null>(null);

  const [currentVideoStep, setCurrentVideoStep] = useState<VideoStep | null>(null);

  const [showRecipeOffCanvas, setShowRecipeOffCanvas] = useState(false);

  const callbacks = { setTimestamp }

  const [insertDirectionTimestamp, { loading: insertDirectionTimestampLoading, error: insertDirectionTimestampError }] = useMutation(INSERT_DIRECTION_VIDEO_TIMESTAMP);
  const [insertIngredientTimestamp, { loading: insertIngredientTimestampLoading, error: insertIngredientTimestampError }] = useMutation(INSERT_INGREDIENT_VIDEO_TIMESTAMP);

  const { loading, error, data, refetch } = useQuery(QUERY, {
    variables: {
      id
    }
  });

  const reloadRecipe = async () => {
    await refetch();
  }

  if (loading) return (<h4>'Loading...'</h4>);
  if (error) return (<h4>{`Error! ${error.message}`}</h4>);

  const { recipes_by_pk: recipe } = data as {recipes_by_pk: Recipes};

  const markVideoStep = async () => {
    if (currentVideoStep === null) {
      console.error('no current video step selected.');
      return;
    }

    if (currentVideoStep.type === 'direction') {
      const direction = recipe.recipe_directions[currentVideoStep.idx];

      await insertDirectionTimestamp({
        variables: {
          id: direction.id,
          video_timestamp: 0
        }
      });
    } else if (currentVideoStep.type === 'ingredient') {
      const ingredientGroup = recipe.recipe_ingredient_groups[currentVideoStep.group_idx];
      const ingredient = ingredientGroup.group_ingredients[currentVideoStep.ingredient_idx];

      await insertIngredientTimestamp({
        variables: {
          id: ingredient.id,
          video_timestamp: 0
        }
      });
    } else {
      console.error('unknown video step type.');
    }
  }

  const sourceHostname = getSourceHostname(recipe.source);

  const ingredientNames = recipe.recipe_ingredient_groups.reduce((ingredients, g) => {
    const groupIngredients = g.group_ingredients.map(i => i.name as string);
    return [
      ...ingredients,
      ...groupIngredients.map((i: string | null) => {
        if (i === null) {
          return '';
        }
        return i.replace(/\W/g, '');
      })
    ]
  }, [] as string[]);

  return (
    <Container className="ViewRecipePage" data-testid="ViewRecipePage">
      <Row className='my-3'>
        <Col md={12}>
          <h1 className="text-4xl pb-8">
            {recipe.name}
          </h1>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Button variant="outline-dark" size='sm' onClick={() => setShowRecipeOffCanvas(true)} className="fs-8" style={{cursor: 'pointer', userSelect: 'none'}}><i className='bi bi-star' /></Button>
          <h5 className='text-right mx-3' style={{ transform: 'translateY(50%)', top: '50%', display: 'inline' }}>from <a href={recipe.source}>{sourceHostname}</a></h5>
          {recipe.recipe_tags.map((tag) => {
            return (
              <Badge key={tag.id} className="mx-1 fs-6" style={{cursor: 'pointer', userSelect: 'none'}} bg="light" text="muted">{tag.name}</Badge>
            )
          })}
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={3} className='my-3'>
          <h3>Prepare</h3>
          <IngredientList callbacks={callbacks} ingredientGroups={recipe.recipe_ingredient_groups} reloadRecipe={reloadRecipe} />
        </Col>
        {
          recipe.video ? (
            <>
              <Col xs={12} md={6} className='my-3'>
                <h3>Directions</h3>
                <RecipeDirections recipe={recipe} callbacks={callbacks} />
              </Col>
              <Col xs={12} md={3} className='my-3'>
                <h3>Watch</h3>
                <VideoPlayer url={recipe.video} timestamp={timestamp} />
              </Col>
            </>
          ) : (
            <Col xs={12} md={9} className='my-3'>
              <h3>Directions</h3>
              <RecipeDirections recipe={recipe} callbacks={callbacks} />
            </Col>
          )
        }
      </Row>
      <RecipeOffCanvas recipe={recipe} visible={showRecipeOffCanvas} callbacks={{ show: setShowRecipeOffCanvas }} />
    </Container>
  )
}
