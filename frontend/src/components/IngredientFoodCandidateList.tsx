import React, { useEffect, useState } from 'react';

import { gql } from '@apollo/client';
import { Button, Card, Col, Container, Form, FormLabel, Row } from 'react-bootstrap';
import {
  Food,
  Food_Portion,
  Ingredient_Food_Candidate_Constraint,
  Ingredient_Food_Candidate_Update_Column,
  Ingredients_Constraint,
  Ingredients_Update_Column,
  useSearchFoodsQuery,
  useUpsertIngredientMutation,
} from '../generated/graphql.tsx.bak';

interface FoodCandidateListProps {
  name: string
  selectedCallback: React.Dispatch<void>
}

const SEARCH_FOODS_QUERY = gql`
query SearchFoods($search: String!) {
  search_foods(args: {search: $search}, limit: 10) {
      fdc_id
      description
      food_portions(distinct_on: [measure_unit_id, modifier, portion_description]) {
          id
          amount
          gram_weight
          modifier
          measure_unit {
              ml
              name
          }
          measure_unit_id
      }
  }
}
`;

const INSERT_INGREDIENT_FOOD = gql`
mutation UpsertIngredient($ingredient: ingredients_insert_input!, $on_conflict: ingredients_on_conflict) {
  insert_ingredients_one(object: $ingredient, on_conflict: $on_conflict) {
    id
  }
}
`;

const FoodCandidate = (props: { name: string, foodCandidate: Food, setSelectedCandidate: React.Dispatch<boolean> }) => {
  const { name, foodCandidate, setSelectedCandidate } = props;

  const [portion, setPortion] = useState<Food_Portion | null>(null);

  const [create, { data, error, loading }] = useUpsertIngredientMutation();

  useEffect(() => {
    if (foodCandidate.food_portions.length === 0) {
      return;
    }
    setPortion(foodCandidate.food_portions[0]);
  }, []);

  const changeFoodPortion = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event === null) {
      throw new Error('event is null');
    }

    const idx = parseInt(event.target.value, 10);
    if (idx < 0 || idx > foodCandidate.food_portions.length) {
      throw new Error(`idx ${idx} is out of range for ${foodCandidate.food_portions}`);
    }

    setPortion(foodCandidate.food_portions[idx]);
  }

  const createFoodCandidate = async () => {
    if (portion === null) {
      return;
    }

    try {
      await create({
        variables: {
          ingredient: {
            name,
            ingredient_food_candidate: {
              data: {
                food_candidate_id: foodCandidate.fdc_id,
                food_candidate_portion_id: portion.id,
              },
              on_conflict: {
                constraint: Ingredient_Food_Candidate_Constraint.IngredientFoodCandidateFoodCandidateIdFoodCandidatePort,
                update_columns: [
                  Ingredient_Food_Candidate_Update_Column.FoodCandidateId,
                  Ingredient_Food_Candidate_Update_Column.FoodCandidatePortionId,
                ],
              },
            },
          },
          on_conflict: {
            constraint: Ingredients_Constraint.IngredientsNameKey,
            update_columns: [
              Ingredients_Update_Column.Name,
            ],
          },
        },
      })
    } catch (e) {
      console.error(e);
    }

    setSelectedCandidate(true);
  }

  return (
    <Card>
      <Card.Header>
        <Card.Title>{foodCandidate.description}</Card.Title>
      </Card.Header>
      <Card.Body>
        <FormLabel id="food-input-label">Food</FormLabel>
        <Form.Select
          onChange={changeFoodPortion}
        >
          {foodCandidate.food_portions.filter(p => p.amount).map((p, idx) => {
            const measureUnit = p.measure_unit && p.measure_unit.name !== 'undetermined'
              ? p.measure_unit.name
              : (`${p.portion_description} ${p.modifier}`);
            return (
              <option key={p.id} value={idx}>
                {p.gram_weight}g == {p.amount} {measureUnit}
              </option>
            )
          })}
        </Form.Select>
        <Button onClick={createFoodCandidate} disabled={loading}>Select</Button>
      </Card.Body>
    </Card>
  )
}

const IngredientFoodCandidateList: React.FunctionComponent<FoodCandidateListProps> = (props) => {
  const { name, selectedCallback } = props;

  const [selectedCandidate, setSelectedCandidate] = React.useState(false);

  if (selectedCandidate) {
    setSelectedCandidate(false);
    selectedCallback();
  }

  const { loading, error, data } = useSearchFoodsQuery({
    variables: {
      search: name,
    },
  });

  if (loading) return (<h4>'Loading...'</h4>);
  if (error) return (<h4>{`Error! ${error.message}`}</h4>);

  if (!data) {
    return (
      <>No food candidates for recipe ingredient.</>
    )
  }

  return (
    <Container>
      <Row>
        <h4>Select food for ingredient</h4>
      </Row>
      <Row>
        {data.search_foods.map((food_candidate, idx) => (
          <Col key={food_candidate.fdc_id} md={6} className="my-2">
            <FoodCandidate name={name} foodCandidate={food_candidate as Food} setSelectedCandidate={setSelectedCandidate} />
          </Col>
        ))}
      </Row>
    </Container>
  )
};

export default IngredientFoodCandidateList;
