import React from 'react';
import {graphql} from "relay-runtime";
import {useLazyLoadQuery} from "react-relay";
import {ViewRecipeQuery} from "./__generated__/ViewRecipeQuery.graphql";
import {Spinner} from "baseui/spinner";
import {DisplayLarge, DisplayMedium} from "baseui/typography";
import {ListItem, ListItemLabel} from "baseui/list";
import {useParams} from "react-router-dom";

const ViewRecipeQuery = graphql`
    query ViewRecipeQuery($id: uuid!) {
        recipeRecipeByPk(id: $id) {
            name
            ingredients(orderBy: {seq: ASC}) {
                id
                seq
                text
            }
            directions(orderBy: {seq: ASC}) {
                id
                seq
                text
            }
        }
  }
`;

export const View = () => {
  const params = useParams();

  const recipeId = params.recipeId;
  if (!recipeId) {
    return <>Invalid recipeId</>;
  }

  const data = useLazyLoadQuery<ViewRecipeQuery>(ViewRecipeQuery, {
    id: recipeId
  });

  const recipe = data.recipeRecipeByPk;
  if (!recipe) {
    return <Spinner />;
  }

  return (
    <>
      <DisplayLarge>{recipe.name}</DisplayLarge>
      <>
        <DisplayMedium>Ingredients</DisplayMedium>
        {recipe.ingredients.map(i => (
          <ListItem><ListItemLabel>{i.text}</ListItemLabel></ListItem>
        ))}
        <DisplayMedium>Directions</DisplayMedium>
        {recipe.directions.map(i => (
          <ListItem><ListItemLabel>{i.text}</ListItemLabel></ListItem>
        ))}
      </>
    </>
  );
};
