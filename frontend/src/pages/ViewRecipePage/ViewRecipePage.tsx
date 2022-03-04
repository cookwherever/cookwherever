import React, { useState } from 'react'


import { gql, useMutation, useQuery } from '@apollo/client';
import {
  List,
  ListItem,
  Grid,
  Paper,
  styled,
  Box,
  Typography,
  FormControl, InputLabel, Select, MenuItem, Fab
} from '@mui/material';

import Highlighter, { FindChunks } from 'react-highlight-words';
import { Col, Row, Container, ListGroup, Button, Form } from 'react-bootstrap';
import { Recipe_Ingredient_Groups, Recipe_Ingredients, Recipe_Lists, Recipes } from '../../generated/graphql';
import FoodCandidateList from '../../components/FoodCandidateList/FoodCandidateList';
import { getSourceHostname } from '../../utils/format-recipe';


const InstructionPaper = styled(Paper)(({ theme }) => ({
  color: theme.palette.text.secondary,
  padding: '1em',
  margin: '1em'
}));

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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
        seq_num
        step
      }
      recipe_tags(order_by: { seq_num: asc }) {
        name
        id
      }
    }
  }
`

const GET_RECIPE_LISTS = gql`
query GetRecipeLists {
    recipe_lists {
        id
        name
    }
}
`;

const INSERT_RECIPE_TO_LIST = gql`
mutation InsertRecipeIntoList($recipe_id: Int = 10, $recipe_list_id: Int = 10) {
  insert_recipe_list_items_one(object: {recipe_id: $recipe_id, recipe_list_id: $recipe_list_id}) {
    id
  }
}
`;

const HIDE_RECIPE = gql`
mutation HideRecipe($id: Int = 0) {
  update_recipes_by_pk(pk_columns: {id: $id}, _set: {visible: false}) {
    id
  }
}

`;

interface IngredientListProps {
  ingredientGroups: Recipe_Ingredient_Groups[];
  reloadRecipe: () => void;
}

const Ingredient = (props: {ingredientGroup: Recipe_Ingredient_Groups, reloadRecipe: () => void}) => {
  const { ingredientGroup, reloadRecipe } = props;
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
    <Container>
      <Typography variant='h5'>{ingredientGroup.name}</Typography>
      <ListGroup>
        {ingredientGroup.group_ingredients.map((ingredient, idx) => {
          console.log(ingredient.amount, ingredient.units);
          ingredient.recipe_ingredient_food_candidates.forEach(i => {
            console.log(i);
          });
          const lookup: Record<string, number> = {
            teaspoon: 1,
            tablespoon: 3,
            cup: 4 * 4 * 3,
          };

          if (ingredient.amount && ingredient.units) {
            const modifier = lookup[ingredient.units];
            const normalized = ingredient.amount / modifier;
          }
          return (
            <ListGroup.Item>
              {ingredient.text} - ({ingredient.name} {ingredient.amount} {ingredient.units})
            </ListGroup.Item>
          )
        })}
      </ListGroup>
    </Container>
  )
}

export const IngredientList: React.FunctionComponent<IngredientListProps> = (props) => {
  return (
    <Container>
      <Row>
        {props.ingredientGroups.map((ingredient_group) => (
          <Col sm key='recipe-ingredient-group'>
            <Ingredient ingredientGroup={ingredient_group} reloadRecipe={props.reloadRecipe} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

interface SaveRecipeProps {
  recipe: Recipes;
}

const SaveRecipe = (props: SaveRecipeProps) => {
  const { recipe } = props;
  const [selectedList, setSelectedList] = useState(-1);
  const [saveRecipeInsert, { loading: saveRecipeLoading, error: saveRecipeError }] = useMutation(INSERT_RECIPE_TO_LIST);
  const saveRecipe = async () => {
    if (selectedList === -1) {
      console.error('no list selected');
      return;
    }

    await saveRecipeInsert({
      variables: {
        recipe_id: recipe.id,
        recipe_list_id: selectedList,
      }
    });
  }

  const { loading, error, data } = useQuery(GET_RECIPE_LISTS, {
    variables: {}
  });

  if (loading) return (<h4>'Loading...'</h4>);
  if (error) return (<h4>{`Error! ${error.message}`}</h4>);

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { recipe_lists } = data as {recipe_lists: Recipe_Lists[]};

  return (
    <Row className="justify-content-md-center">
      <Col xs={12} md={8} className="px-1">
        <Form.Select
          id="recipe-list-select"
          value={selectedList}
          onChange={(event) => { setSelectedList(parseInt(event.target.value, 10)); }}
        >
          {recipe_lists.map(list => {
            return (
              <option value={list.id} key={list.id}>{list.name}</option>
            )
          })}
        </Form.Select>
      </Col>
      <Col md={4} className="px-1">
        <Button size="sm" onClick={saveRecipe}>Save</Button>
      </Col>
    </Row>
  )
};

interface HideRecipeProps {
  recipe: Recipes;
}

const HideRecipe = (props: HideRecipeProps) => {
  const { recipe } = props;

  const [hideRecipe, { loading: hideRecipeLoading, error: hideRecipeError }] = useMutation(HIDE_RECIPE);
  const doHideRecipe = async () => {
    await hideRecipe({
      variables: {
        id: recipe.id,
      }
    });
  }

  return (
    <Button size="sm" onClick={doHideRecipe}>Hide</Button>
  )
};

export const ViewRecipePage: React.FunctionComponent<ViewRecipePageProps> = (props) => {
  const { id } = props.match.params;

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

  const printRecipe = () => {
    const url = 'https://hass.vanderpot.net/api/webhook/qW60QVQzUzzBdRd4rj79mWR3HK2Oxu4d';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(recipe),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  return (
    <Container className="ViewRecipePage" data-testid="ViewRecipePage">
      <Row className='my-2'>
        <Col xs={12} md={8}>
          <h1 className="text-4xl pb-8">
            {recipe.name}
          </h1>
          <h5>from <a href={recipe.source}>{sourceHostname}</a></h5>
        </Col>
        <Col className="p-3" xs={6} md={4}>
          <Form>
            <Row>
              <Col md={8}>
                <Form.Group controlId="formSaveToList">
                  <SaveRecipe recipe={recipe} />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group controlId="formPrint">
                  <Button size="sm" onClick={printRecipe}>Print</Button>
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group controlId="formHide">
                  <HideRecipe recipe={recipe} />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Row>
        <Container>
          <Row>
            <Col xs={6} md={4}>
              <h3>Ingredients</h3>
              <IngredientList ingredientGroups={recipe.recipe_ingredient_groups} reloadRecipe={reloadRecipe} />
            </Col>
            <Col xs={12} md={8}>
              <h3>Directions</h3>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  {recipe.recipe_directions.map((direction, idx) => {
                      return (
                        <Grid sm={12}>
                          <InstructionPaper key={direction.id}>
                            <Highlighter searchWords={ingredientNames} textToHighlight={direction.step} autoEscape={false} />
                          </InstructionPaper>
                        </Grid>
                      )
                    }
                  )}
                </Grid>
              </Box>
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  )
}
