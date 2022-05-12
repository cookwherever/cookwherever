import React, { useEffect, useState } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'


import { gql, useMutation, useQuery } from '@apollo/client';

import { Col, Row, Container, Button, Form, Badge, InputGroup, FormControl } from 'react-bootstrap';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import useDebouncedCallback from '@restart/hooks/useDebouncedCallback';
import Timer from 'react-compound-timer';
import {
  Recipes,
  useRecipesQueryQuery,
  useUpdateRecipeVideoMutation,
  useViewRecipeQueryQuery
} from '../../generated/graphql';
import { getSourceHostname } from '../../utils/format-recipe';
import { VideoPlayer } from '../../components/VideoPlayer';
import { RecipeDirections } from '../../components/RecipeDirections';
import { IngredientList } from '../../components/IngredientList';
import { RecipeOffCanvas } from '../../components/RecipeOffCanvas';
import { userState, viewModeState } from '../../recoil/atoms/auth';
import { inDeveloperMode } from '../../recoil/selectors/view-mode';
import { recipeViewerState } from '../../recoil/atoms/recipe';

interface ViewRecipePageProps {
  match: {
    params: {
      slug: string
    }
  }
}

export const QUERY = gql`
  query ViewRecipeQuery($id: Int) {
    recipes(where: {id: {_eq: $id}}) {
      id
      slug
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
          video_timestamp_end
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
        video_timestamp_end
      }
      recipe_tags(order_by: { seq_num: asc }) {
        name
        id
      }
    }
  }
`

export const UPDATE_RECIPE_VIDEO_URL = gql`
mutation UpdateRecipeVideo($id: Int, $video: String = "") {
  update_recipes(where: {id: {_eq: $id}}, _set: {video: $video}) {
    affected_rows
  }
}
`

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

interface ViewModeSelectorProps {
  
}

const ViewModeSelector: React.FunctionComponent<ViewModeSelectorProps> = ({}) => {
  const [viewMode, setViewMode] = useRecoilState(viewModeState);
  
  const toggleDeveloperMode = () => {
    setViewMode(viewMode === 'developer' ? 'view' : 'developer')
  }
  
  return (
    <>
      <Form.Check
        type="switch"
        label="developer"
        checked={viewMode === 'developer'}
        onClick={toggleDeveloperMode}
      />
    </>
  )
}

interface VideoMetadataFormProps {
  recipe: Recipes
}

const VideoMetadataForm: React.FunctionComponent<VideoMetadataFormProps> = ({ recipe }) => {
  const [videoUrl, setVideoUrl] = useState<string>(recipe.video || '');
  const debouncedSetVideoUrl = useDebouncedCallback(setVideoUrl, 500);

  const [updateRecipeVideoMutation] = useUpdateRecipeVideoMutation({
    variables: {
      id: recipe.id
    }
  });

  useEffect(() => {
    updateRecipeVideoMutation({
      variables: {
        video: videoUrl
      }
    })
  }, [videoUrl])

  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text style={{ cursor: 'pointer' }}>Video</InputGroup.Text>
        <FormControl
          defaultValue={videoUrl}
          onChange={(event) => {debouncedSetVideoUrl(event.target.value)}}
        />
      </InputGroup>
    </>
  )
}

export const ViewRecipePage: React.FunctionComponent<ViewRecipePageProps> = ({ match: { params: { slug } } }) => {
  const developerMode = useRecoilValue(inDeveloperMode);
  const [recipeState, setRecipeState] = useRecoilState(recipeViewerState);
  const { invalidated: recipeInvalidated } = recipeState;

  const [showRecipeOffCanvas, setShowRecipeOffCanvas] = useState(false);

  const id = slug.split('-').pop();

  const { loading, error, data, refetch } = useViewRecipeQueryQuery({
    variables: {
      id: parseInt(id || '0', 10),
    }
  });

  useEffect(() => {
    if (!recipeInvalidated) return;

    setRecipeState({
      ...recipeState,
      invalidated: false
    })
    refetch();
  }, [recipeInvalidated])

  if (loading) return null;
  if (error) return (<h4>{`Error! ${error.message}`}</h4>);
  if (!data) return (<h4>Recipe does not exist!</h4>);

  const recipe = data.recipes[0] as Recipes;

  if (!recipe) return (<h4>Recipe does not exist!</h4>);

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
          <ViewModeSelector />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Button variant="outline-dark" size='sm' onClick={() => setShowRecipeOffCanvas(true)} className="fs-8" style={{ cursor: 'pointer', userSelect: 'none' }}>
            <i className='bi bi-star' />
          </Button>
          <h5 className='text-right mx-3' style={{ transform: 'translateY(50%)', top: '50%', display: 'inline' }}>from <a href={recipe.source}>{sourceHostname}</a></h5>
          {recipe.recipe_tags.map((tag) => {
            return (
              <Badge key={tag.id} className="mx-1 fs-6" style={{ cursor: 'pointer', userSelect: 'none' }} bg="light" text="muted">{tag.name}</Badge>
            )
          })}
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={3} className='my-3'>
          <h3>Prepare</h3>
          <IngredientList ingredientGroups={recipe.recipe_ingredient_groups} />
          <>
            {recipeState.timers.map((timer, idx) => (
              <CountdownCircleTimer
                isPlaying
                duration={timer.time / 1000}
                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[7, 5, 2, 0]}
              >
                {({ remainingTime }) => {
                  const hours = Math.floor(remainingTime / 3600)
                  const minutes = Math.floor((remainingTime % 3600) / 60)
                  const seconds = remainingTime % 60

                  const padTime = (value: number) => {
                    return (`00${  value}`).slice(-2);
                  }

                  return (
                    <Container>
                      <Row className='justify-content-center align-items-center'>
                        {`Direction ${timer.stepNumber}`}
                      </Row>
                      <Row className='justify-content-center align-items-center'>
                        {`${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`}
                      </Row>
                    </Container>
                  )
                }}
              </CountdownCircleTimer>
            ))}
          </>
        </Col>
        {
          recipe.video || developerMode ? (
            <>
              <Col xs={12} md={6} className='my-3'>
                <h3>Directions</h3>
                <RecipeDirections recipe={recipe} showStepNumbers={false} />
              </Col>
              <Col xs={12} md={3} className='my-3'>
                <h3>Watch</h3>
                {
                  developerMode && (
                    <Row>
                      <Col md={12}>
                        <VideoMetadataForm recipe={recipe} />
                      </Col>
                    </Row>
                  )
                }
                {
                  recipe.video && (
                    <Row>
                      <Col md={12}>
                        <VideoPlayer recipe={recipe} />
                      </Col>
                    </Row>
                  )
                }
              </Col>
            </>
          ) : (
            <Col xs={12} md={9} className='my-3'>
              <h3>Directions</h3>
              <RecipeDirections recipe={recipe} showStepNumbers={false} />
            </Col>
          )
        }
      </Row>
      <RecipeOffCanvas recipe={recipe} visible={showRecipeOffCanvas} callbacks={{ show: setShowRecipeOffCanvas }} />
    </Container>
  )
}
