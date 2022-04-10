import React, { ChangeEvent, useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import { gql, useQuery } from '@apollo/client';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import {Recipes, Recipes_Aggregate, Recipes_Bool_Exp, useRecipesQueryQuery} from '../../generated/graphql';
import { RecipeSearch } from '../../types/component-types';
import { getSourceHostname } from '../../utils/format-recipe';
import {useHistory} from "react-router-dom";

export const QUERY = gql`
  query RecipesQuery($search: String, $where: recipes_bool_exp!, $limit: Int = 10, $offset: Int = 0) {
    search_recipes(args: {search: $search}, where: $where, limit: $limit, offset: $offset, order_by: {updated_at: asc}) {
      id
      slug
      name
      source
      created_at
      image
    }
    search_recipes_aggregate(args: {search: $search}, where: $where) {
        aggregate {
            count
        }
    }
  }
`

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
  const { recipeSearch } = props;

  const [page, setPage] = useState(0);
  const history = useHistory();

  useEffect(() => {
    setPage(0);
  }, [recipeSearch])

  const resultsPerPage = 20;

  const changePage = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  }

  const whereConditions: Recipes_Bool_Exp[] = [
    {
      visible: {
        _eq: true
      }
    }
  ];

  if (recipeSearch.source !== '') {
    whereConditions.push({
      source_provider_id: {
        _eq: recipeSearch.source
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

  if (recipeSearch.tags.length > 0) {
    for (const tag of recipeSearch.tags) {
      whereConditions.push({
        recipe_tags: {
          name: {
            _eq: tag
          }
        }
      })
    }
  }

  const where: Recipes_Bool_Exp = getRecipeSearchWhere(whereConditions);

  const { loading, error, data } = useRecipesQueryQuery({
    variables: {
      search: recipeSearch.name,
      where,
      limit: resultsPerPage,
      offset: resultsPerPage * page
    }
  });

  if (loading) return (<h4>'Loading...'</h4>);
  if (error) return (<h4>{`Error! ${error.message}`}</h4>);
  if (!data) return (<h4>No data!</h4>);

  if (!data.search_recipes || data.search_recipes.length === 0) {
    return (
      <p>Search for a recipe!</p>
    )
  }

  const recipeCount = data.search_recipes_aggregate.aggregate;
  if (!recipeCount) {
    return (
      <p>Search for a recipe!</p>
    )
  }

  const pageCount = Math.floor(recipeCount.count / resultsPerPage);

  return (
    <Container>
      <Row>
        {data.search_recipes.map((recipe, idx) => {
          if (!recipe) return null;

          const recipeImage = recipe.image || 'https://via.placeholder.com/300x250';
          return (
            <Col
              key={recipe.id}
              sm
              className='my-2'
            >
              <Card
                style={{ width: '18rem', height: '100%' }}
                className='hover-card'
                onClick={() => {
                  history.push(`/recipe/${recipe.slug}-${recipe.id}`)
                }}
              >
                {/*<Card.Img variant="top" src={recipeImage} />*/}
                <Card.Body>
                  <Card.Title>{recipe.name}</Card.Title>
                  <Card.Text>
                    <a href={recipe.source}>{getSourceHostname(recipe.source)}</a>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )
        })}
        <Pagination page={page + 1} count={pageCount} onChange={changePage} />
      </Row>
    </Container>
  )
}