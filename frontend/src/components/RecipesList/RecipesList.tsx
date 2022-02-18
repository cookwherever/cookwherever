import React, { ChangeEvent, useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Pagination } from '@mui/material';
import { gql, useQuery } from '@apollo/client';
import { Recipes, Recipes_Aggregate, Recipes_Bool_Exp } from '../../generated/graphql';
import { RecipeSearch } from '../../types/component-types';

export const QUERY = gql`
  query RecipesQuery($where: recipes_bool_exp!, $limit: Int = 10, $offset: Int = 0) {
    recipes(where: $where, limit: $limit, offset: $offset, order_by: {updated_at: asc}) {
      id
      name
      created_at
    }
    recipes_aggregate(where: $where) {
        aggregate {
            count
        }
    }
  }
`

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      backgroundColor: theme.palette.background.default
    },
  }),
);

function getRecipeSearchWhere(whereConditions: Recipes_Bool_Exp[]): Recipes_Bool_Exp {
  if (whereConditions.length === 0) {
    return {};
  }

  if (whereConditions.length > 1) {
    return {
      _and: whereConditions
    }
  }
  return whereConditions[0];
}

interface RecipesListProps {
  recipeSearch: RecipeSearch
}

export const RecipesList: React.FunctionComponent<RecipesListProps> = (props) => {
  const classes = useStyles();

  const { recipeSearch } = props;

  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [recipeSearch])

  const resultsPerPage = 20;

  const changePage = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  }

  console.log(recipeSearch);

  const whereConditions: Recipes_Bool_Exp[] = [
    {
      visible: {
        _eq: true
      }
    }
  ];

  if (recipeSearch.name !== '') {
    whereConditions.push({
      name: {
        _ilike: `%${recipeSearch.name}%`
      }
    });
  }

  if (recipeSearch.source !== '') {
    whereConditions.push({
      source: {
        _ilike: `%${recipeSearch.source}%`
      }
    });
  }

  if (recipeSearch.ingredients.length > 0) {
    for (const ingredient of recipeSearch.ingredients) {
      whereConditions.push({
        recipe_ingredient_groups: {
          group_ingredients: {
            text: {
              _ilike: `%${ingredient}%`
            }
          }
        }
      })
    }
  }

  const where: Recipes_Bool_Exp = getRecipeSearchWhere(whereConditions);

  const { loading, error, data } = useQuery(QUERY, {
    variables: {
      where,
      limit: resultsPerPage,
      offset: resultsPerPage * page
    }
  });

  if (loading) return (<h4>'Loading...'</h4>);
  if (error) return (<h4>{`Error! ${error.message}`}</h4>);

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { recipes, recipes_aggregate } = data as {recipes_aggregate: Recipes_Aggregate, recipes: Recipes[]};

  if (recipes.length === 0) {
    return (
      <p>Search for a recipe!</p>
    )
  }

  const recipeCount = recipes_aggregate.aggregate;
  if (!recipeCount) {
    return (
      <p>Search for a recipe!</p>
    )
  }

  const pageCount = Math.floor(recipeCount.count / resultsPerPage);

  return (
    <div>
      {recipes.map((recipe: Recipes, idx) => {
        const recipeImage = recipe.image ? (<img src={recipe.image} />) : null;
        return (
          <a key={`recipe-link-${recipe.id}`} href={`/recipe/${recipe.id}`}>
            <div className="">
              <h2>{recipe.name}</h2>
              {recipeImage}
            </div>
          </a>
        )
      })}
      <Pagination page={page + 1} count={pageCount} onChange={changePage} />
    </div>
  )
}