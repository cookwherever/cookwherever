import React, { useState } from 'react'
import './RecipeListsPage.scss'
import { ApolloCache, DefaultContext, gql, OperationVariables, useMutation, useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Link,
  List,
  ListItem, makeStyles,
  Modal, ModalUnstyled,
  Paper, styled,
  Theme,
  Typography
} from '@mui/material';
import { buildASTSchema } from 'graphql';
import { GraphQLBridge } from 'uniforms-bridge-graphql';
import { AutoForm } from 'uniforms-material';
import { ApolloQueryResult } from '@apollo/client/core/types';
import { FetchResult } from '@apollo/client/link/core';
import { MutationFunctionOptions } from '@apollo/client/react/types/types';
import { Recipe_List_Items, Recipe_Lists, Recipes } from '../../generated/graphql';

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

const recipeListSchema = gql`
    type RecipeList {
        name: String
    }

    type Query {
        anything: ID
    }
`

const schemaType = buildASTSchema(recipeListSchema).getType('RecipeList');
// @ts-ignore
const bridge = new GraphQLBridge(schemaType, () => {}, {});

interface RecipeListsPageProps {

}

const RecipeListItem = (recipe_list_item: Recipe_List_Items) => {
  const recipeLink = `/recipe/${recipe_list_item.recipe.id}`;
  return (
    <ListItem key={recipe_list_item.id}>
      <Typography variant='body2'>
        <Link href={recipeLink}>{recipe_list_item.recipe.name}</Link>
      </Typography>
    </ListItem>
  )
}

interface RecipeListCardProps {
  refetch: (variables?: Partial<{}>) => Promise<ApolloQueryResult<{}>>;
  deleteList: (options?: MutationFunctionOptions<{}, OperationVariables, DefaultContext, ApolloCache<{}>>) => Promise<FetchResult<{}>>;
  recipe_list: Recipe_Lists;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<boolean>;
}

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

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
      }
    });
    await refetch();
  };

  const nullOrUndefined = (obj?: number | null) => (obj === undefined || obj === null) ? 0 : obj;

  return (
    <Grid item xs={6} key={recipe_list.id}>
      <Card>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
            {recipe_list.name}
          </Typography>
          <List>
            {[...recipe_list.recipe_list_items]
              .sort((a, b) => nullOrUndefined(a.seq_num) - nullOrUndefined(b.seq_num))
              .map(RecipeListItem)}
          </List>
          <Button onClick={() => setModalOpen(true)}>Delete</Button>
          <StyledModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            BackdropComponent={Backdrop}
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Are you sure you want to delete this list?
              </Typography>
              <Button variant="text" onClick={removeList}>Delete</Button>
            </Box>
          </StyledModal>
        </CardContent>
      </Card>
    </Grid>
  )
}

export const RecipeListsPage: React.FunctionComponent<RecipeListsPageProps> = (props) => {
  const [create, { loading: createLoading, error: createError }] = useMutation(INSERT_RECIPE_LIST);
  const [deleteList, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_RECIPE_LIST);
  const [modalOpen, setModalOpen] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_RECIPE_LISTS, {
    variables: {}
  });

  if (loading) return (<h4>'Loading...'</h4>);
  if (error) return (<h4>{`Error! ${error.message}`}</h4>);

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { recipe_lists } = data as {recipe_lists: Recipe_Lists[]};

  const onSubmit = async (recipeList: Recipe_Lists) => {
    const resp = await create({
      variables: {
        name: recipeList.name
      }
    })
    console.log(resp);

    await refetch();
  }

  return (
    <div className="RecipeListsPage" data-testid="RecipeListsPage">
      <AutoForm
        placeholder={true}
        schema={bridge}
        // @ts-ignore
        onSubmit={onSubmit}
      />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {recipe_lists.map((recipe_list) => RecipeListCard({ refetch, deleteList, recipe_list, modalOpen, setModalOpen }))}
      </Grid>
    </div>
  );
}
