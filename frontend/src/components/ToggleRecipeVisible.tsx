import { gql, useMutation } from '@apollo/client';
import { Button } from 'react-bootstrap';
import React from 'react';
import { Recipes } from '../generated/graphql';


const HIDE_RECIPE = gql`
mutation HideRecipe($id: Int = 0) {
  update_recipes_by_pk(pk_columns: {id: $id}, _set: {visible: false}) {
    id
  }
}

`;

interface ToggleRecipeVisibleProps {
  recipe: Recipes;
}

export const ToggleRecipeVisible: React.FunctionComponent<ToggleRecipeVisibleProps> = ({ recipe }) => {
  const [hideRecipe, { loading: hideRecipeLoading, error: hideRecipeError }] = useMutation(HIDE_RECIPE);
  const doHideRecipe = async () => {
    await hideRecipe({
      variables: {
        id: recipe.id,
      },
    });
  }

  return (
    <Button size="sm" onClick={doHideRecipe}>Toggle recipe </Button>
  )
};
