import React, { useState } from 'react'

import { ApolloCache, DefaultContext, gql, OperationVariables, useMutation, useQuery } from '@apollo/client';
import { ApolloQueryResult } from '@apollo/client/core/types';
import { FetchResult } from '@apollo/client/link/core';
import { MutationFunctionOptions } from '@apollo/client/react/types/types';
import { Button, Card, Col, Container, Form, FormControl, Modal, Row } from 'react-bootstrap';
import { Recipe_List_Items, Recipe_Lists, Recipes } from '../../generated/graphql.tsx.bak';
import { inputChangeHandler } from '../../utils/hook-helpers';

const GET_RECIPE_LISTS = gql`
query GetUserRecipeLists {
  recipe_lists {
    id
    name
    recipe_list_items {
      id  
      seq_num
      recipe {
        id
        name  
      }  
    }
  }
}
`

const INSERT_RECIPE_LIST = gql`
    mutation InsertRecipeList($name: String) {
        insert_recipe_lists_one(object: {name: $name}) {
            id
        }
    }
`;

const DELETE_RECIPE_LIST = gql`
    mutation DeleteRecipeList($id: Int) {
        delete_recipe_lists(where: {id: {_eq: $id}}) {
            affected_rows
        }
    }
`;

interface RecipeListsPageProps {

}

const RecipeListItem = (recipe_list_item: Recipe_List_Items) => {
  const recipeLink = `/recipe/${recipe_list_item.recipe.id}`;
  return (
    <Row key={recipe_list_item.id}>
      <div className="fs-5">
        <a href={recipeLink}>{recipe_list_item.recipe.name}</a>
      </div>
    </Row>
  )
}

interface RecipeListCardProps {
  refetch: (variables?: Partial<{}>) => Promise<ApolloQueryResult<{}>>;
  deleteList: (options?: MutationFunctionOptions<{}, OperationVariables, DefaultContext, ApolloCache<{}>>) => Promise<FetchResult<{}>>;
  recipe_list: Recipe_Lists;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<boolean>;
}

const style = {
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  p: 2,
  px: 4,
  pb: 3,
};

const RecipeListCard = (props: RecipeListCardProps) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { refetch, deleteList, recipe_list, modalOpen, setModalOpen } = props;

  const removeList = async () => {
    setModalOpen(false);
    await deleteList({
      variables: {
        id: recipe_list.id,
      },
    });
    await refetch();
  };

  const nullOrUndefined = (obj?: number | null) => (obj === undefined || obj === null) ? 0 : obj;

  return (
    <Col md={6} key={recipe_list.id}>
      <Card>
        <Card.Body>
          <div className="fs-3">
            {recipe_list.name}
          </div>
          <Row>
            {[...recipe_list.recipe_list_items]
              .sort((a, b) => nullOrUndefined(a.seq_num) - nullOrUndefined(b.seq_num))
              .map(RecipeListItem)}
          </Row>
          <Button onClick={() => setModalOpen(true)}>Delete</Button>
          <Modal
            show={modalOpen}
            onHide={() => setModalOpen(false)}
          >
            <div id="modal-modal-title" className="fs-3">
              Are you sure you want to delete this list?
            </div>
            <Button variant="text" onClick={removeList}>Delete</Button>
          </Modal>
        </Card.Body>
      </Card>
    </Col>
  )
}

export const RecipeListsPage: React.FunctionComponent<RecipeListsPageProps> = (props) => {
  const [create, { loading: createLoading, error: createError }] = useMutation(INSERT_RECIPE_LIST);
  const [deleteList, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_RECIPE_LIST);
  const [modalOpen, setModalOpen] = useState(false);
  const [listName, setListName] = useState<string | null>(null);

  const { loading, error, data, refetch } = useQuery(GET_RECIPE_LISTS, {
    variables: {},
  });

  if (loading) return (<h4>'Loading...'</h4>);
  if (error) return (<h4>{`Error! ${error.message}`}</h4>);

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { recipe_lists } = data as { recipe_lists: Recipe_Lists[] };

  const onSubmit = async () => {
    const resp = await create({
      variables: {
        name: listName,
      },
    })
    console.log(resp);

    await refetch();
  }

  return (
    <Container className="RecipeListsPage" data-testid="RecipeListsPage">
      <Row>
        <Form>
          <h4>New List</h4>
          <input name="name" onChange={inputChangeHandler(setListName)} />
          <Button onClick={onSubmit}>Submit</Button>
        </Form>
      </Row>
      <Row>
        {recipe_lists.map((recipe_list) => RecipeListCard({ refetch, deleteList, recipe_list, modalOpen, setModalOpen }))}
      </Row>
    </Container>
  );
}
