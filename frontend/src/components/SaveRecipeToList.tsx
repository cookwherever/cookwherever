import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, Col, Form, Row } from 'react-bootstrap';
import {Recipe_Lists, Recipes} from '../generated/graphql';

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

interface SaveRecipeProps {
  recipe: Recipes;
}

export const SaveRecipeToList: React.FunctionComponent<SaveRecipeProps> = ({ recipe }) => {
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

