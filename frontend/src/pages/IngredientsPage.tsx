import React from 'react'
import { Container } from 'react-bootstrap';
import {gql} from '@apollo/client';
import {useGetMostCommonIngredientsQuery} from "../generated/graphql";

const MOST_COMMON_INGREDIENTS = gql`
query GetMostCommonIngredients {
  most_common_ingredients(limit: 100) {
    ingredient_count
    name
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

export const IngredientsPage: React.FunctionComponent<IngredientsPageProps> = (props) => {
  const { data, error, loading } = useGetMostCommonIngredientsQuery();

  if (loading) return null;
  if (error) return (<h4>{`Error! ${error.message}`}</h4>);
  if (!data) return (<h4>Common ingredients do not exist!</h4>);

  return (
    <Container>
      {data.most_common_ingredients.map(i => (
        <p>{i.name} - {i.ingredient_count}</p>
      ))}
    </Container>
  );
}
