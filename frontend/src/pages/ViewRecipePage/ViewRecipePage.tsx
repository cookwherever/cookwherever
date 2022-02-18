import React, { useState } from 'react'
// import './ViewRecipePage.scss'

import { gql, useMutation, useQuery } from '@apollo/client';
import {
  List,
  ListItem,
  Container,
  Grid,
  Paper,
  styled,
  Box,
  Typography,
  Button, FormControl, InputLabel, Select, MenuItem, Fab
} from '@mui/material';

import Highlighter, { FindChunks } from 'react-highlight-words';
import { Add, Print } from '@material-ui/icons';
import numericQuantity from 'numeric-quantity';
import { Recipe_Ingredient_Groups, Recipe_Ingredients, Recipe_Lists, Recipes } from '../../generated/graphql';
import FoodCandidateList from '../../components/FoodCandidateList/FoodCandidateList';


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
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant='h5'>{ingredientGroup.name}</Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
            <Grid item xs={6} key='recipe-ingredient-group-ingredient'>
              <Item>
                {ingredient.text}
                ({ingredient.name} {ingredient.amount} {ingredient.units})
                {
                  ingredient.recipe_ingredient_food_candidates.length
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
                }
              </Item>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export const IngredientList: React.FunctionComponent<IngredientListProps> = (props) => {
  return (
    <List>
      {props.ingredientGroups.map((ingredient_group) => (
        <ListItem key='recipe-ingredient-group'>
          <Ingredient ingredientGroup={ingredient_group} reloadRecipe={props.reloadRecipe} />
        </ListItem>
      ))}
    </List>
  )
}

function getSourceHostname(source: string) {
  try {
    return new URL(source).hostname;
  } catch (e) {
    return source;
  }
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
    <FormControl sx={{ flexDirection: 'row' }}>
      <InputLabel id="recipe-list-select-label">List</InputLabel>
      <Select
        labelId="recipe-list-select-label"
        id="recipe-list-select"
        value={selectedList}
        label="List"
        onChange={(event) => { setSelectedList(event.target.value as number); }}
      >
        {recipe_lists.map(list => {
          return (
            <MenuItem value={list.id} key={list.id}>{list.name}</MenuItem>
          )
        })}
      </Select>
      <Button onClick={saveRecipe}>save</Button>
    </FormControl>
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
    <Button onClick={doHideRecipe}>Hide</Button>
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
      ...groupIngredients
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
      <Box sx={{ pb: 7 }}>
        <h1 className="text-4xl pb-8">
          {recipe.name}
        </h1>
        <Grid container spacing={2}>
          <Grid item>
            <SaveRecipe recipe={recipe} />
          </Grid>
          <Grid item>
            <Button onClick={printRecipe}>Print</Button>
          </Grid>
          <Grid item>
            <HideRecipe recipe={recipe} />
          </Grid>
        </Grid>
        <div id="recipe-container" className="flex flex-row  justify-around">
          <a href={recipe.source}>
            <h3 className="text-sm">{sourceHostname}</h3>
          </a>
          <div>
            <h3>Ingredients</h3>
            <IngredientList ingredientGroups={recipe.recipe_ingredient_groups} reloadRecipe={reloadRecipe} />
          </div>
          <div>
            <h3>Directions</h3>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {recipe.recipe_directions.map((direction, idx) => {
                  return (
                    <Grid sm={12}>
                      <InstructionPaper key={idx}>
                        <Highlighter searchWords={ingredientNames} textToHighlight={direction.step} autoEscape={false} />
                      </InstructionPaper>
                    </Grid>
                  )
                }
                )}
              </Grid>
            </Box>
          </div>
        </div>
      </Box>
    </Container>
  )
}
