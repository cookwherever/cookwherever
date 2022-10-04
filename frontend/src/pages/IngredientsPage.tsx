import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { gql } from '@apollo/client';
import { Pagination } from '@mui/material';
import useDebouncedCallback from '@restart/hooks/useDebouncedCallback';
import {
  Most_Common_Ingredients_Bool_Exp,
  useGetMostCommonIngredientsQuery, useRecipesWithIngredientQuery,
} from '../generated/graphql';
import { inputChangeHandler } from '../utils/hook-helpers';
import IngredientFoodCandidateList from '../components/IngredientFoodCandidateList';

const MOST_COMMON_INGREDIENTS = gql`
query GetMostCommonIngredients($limit: Int!, $offset: Int!, $where: most_common_ingredients_bool_exp = {}) {
  most_common_ingredients(limit: $limit, offset: $offset, where: $where) {
    ingredient_count
    name
    ingredient {
        ingredient_food_candidate {
            food {
                description
            }
            food_portion {
                gram_weight
                amount
                measure_unit {
                    name
                }
                portion_description
                modifier
            }
        }
    }
  }
    most_common_ingredients_aggregate(where: $where) {
    aggregate {
      count
    }
  }
}
`;

const RECIPES_WITH_INGREDIENT = gql`
query RecipesWithIngredient($ingredient_name: String!) {
  recipes(where: {recipe_ingredient_groups: {group_ingredients: {name: {_eq: $ingredient_name}}}}, limit: 100) {
    id
    name
  }
}
`;

interface IngredientsPageProps {

}

interface IngredientInspectProps {
  ingredientName: string;
}

const IngredientInspect: React.FC<IngredientInspectProps> = ({
  ingredientName,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data, error, loading } = useRecipesWithIngredientQuery({
    variables: {
      ingredient_name: ingredientName,
    },
  });

  if (loading) return null;
  if (error) return (<h4>{`Error! ${error.message}`}</h4>);
  if (!data) return (<h4>Ingredient data not found!</h4>);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>View</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{ingredientName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <IngredientFoodCandidateList name={ingredientName} selectedCallback={() => { console.log('TODO reload recipe') }} />
          {data.recipes.map(recipe => (
            <ul key={recipe.id}>
              <li><a href={`/recipe/${recipe.id}`}>{recipe.name}</a></li>
            </ul>
          ))}
        </Modal.Body>
      </Modal>
    </>
  );
}

export const IngredientsPage: React.FunctionComponent<IngredientsPageProps> = (props) => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState<string | null>(null);

  const debouncedIngredientSearch = useDebouncedCallback(setSearch, 500);

  useEffect(() => {
    setPage(0);
  }, [])

  const resultsPerPage = 20;

  const changePage = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  }

  const where: Most_Common_Ingredients_Bool_Exp = search ? {
    name: {
      _ilike: `%${search}%`,
    },
  } : {};

  const { data, error, loading } = useGetMostCommonIngredientsQuery({
    variables: {
      limit: resultsPerPage,
      offset: resultsPerPage * page,
      where,
    },
  });

  const ingredientsList = () => {
    if (error) {
      return (<h4>{`Error! ${error.message}`}</h4>);
    }

    if (loading) {
      return (<h4>Loading ingredients...</h4>);
    }

    if (!data || !data.most_common_ingredients_aggregate.aggregate) return (<h4>Ingredients do not exist!</h4>);

    const ingredientCount = data.most_common_ingredients_aggregate.aggregate;

    const pageCount = Math.floor(ingredientCount.count / resultsPerPage);

    return (
      <>
        {data.most_common_ingredients.map((ingredient, idx) => {
          const { name } = ingredient;

          return (
            <Col
              key={idx}
              sm
              className='my-2'
            >
              <Card
                style={{ width: '18rem', height: '100%' }}
                className='hover-card'
              >
                {/* <Card.Img variant="top" src={recipeImage} /> */}
                <Card.Body>
                  <Card.Title>{ingredient.name || 'undefined'}</Card.Title>
                  <Card.Text>
                    {`${ingredient.ingredient_count} recipes have this ingredient.`}
                  </Card.Text>
                  <Card.Text>
                    {ingredient.ingredient?.ingredient_food_candidate?.food_portion ? `${ingredient.ingredient.ingredient_food_candidate.food_portion.gram_weight  }g` : 'No food selected.'}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  {
                    name ? (
                      <IngredientInspect ingredientName={name} />
                    ) : 'Ingredient name undefined'
                  }
                </Card.Footer>
              </Card>
            </Col>
          )
        })}
        <Pagination page={page + 1} count={pageCount} onChange={changePage} />
      </>
    )
  };

  return (
    <Container>
      <Row>
        <Form.Group as={Col} md="6">
          <Form.Label>Ingredient Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Salt"
            defaultValue={search || undefined}
            onChange={inputChangeHandler(debouncedIngredientSearch)}
          />
        </Form.Group>
      </Row>
      <Row>
        {ingredientsList()}
      </Row>
    </Container>
  );
}
