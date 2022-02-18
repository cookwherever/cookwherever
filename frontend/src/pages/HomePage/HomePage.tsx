import React, { useEffect, useState } from 'react'
import './HomePage.scss'
import { Box, Container, Paper, styled } from '@material-ui/core';
import { AutoField, AutoForm, ListField, SubmitField } from 'uniforms-material';
import { gql } from '@apollo/client';
import { buildASTSchema } from 'graphql';
import { GraphQLBridge } from 'uniforms-bridge-graphql';
import { useHistory, useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Recipes } from '../../generated/graphql';
import SpeechInput from '../../components/SpeechInput/SpeechInput';
import { RecipesList } from '../../components/RecipesList/RecipesList';
import { RecipeSearch } from '../../types/component-types';

interface HomePageProps {

}

const SearchPaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  padding: '1em',
  margin: '1em'
}));


const recipeSchema = gql`
    type Recipe {
        name: String
        source: String
        ingredients: [String]!
        tags: [String]!
    }

    type Query {
        anything: ID
    }
`

const schemaType = buildASTSchema(recipeSchema).getType('Recipe')
const schemaExtras = {
  recipe_tags: {
    label: 'Tags',
  },
}

const schemaValidator = (recipe: Recipes) => {
  return null
}

const bridge = new GraphQLBridge(
  // @ts-ignore
  schemaType,
  schemaValidator,
  schemaExtras
)


export const HomePage: React.FunctionComponent<HomePageProps> = (props) => {
  const { search, pathname } = useLocation();
  const history = useHistory();

  const urlSearchParams = new URLSearchParams(search);

  const [recipeSearch, setRecipeSearch] = useState<RecipeSearch>({
    name: urlSearchParams.get('name') || '',
    source: urlSearchParams.get('source') || '',
    ingredients: urlSearchParams.getAll('ingredients'),
    tags: urlSearchParams.getAll('tags')
  });

  useEffect(() => {
    const searchParams = new URLSearchParams([
      ['name', recipeSearch.name],
      ['source', recipeSearch.source],
      ...recipeSearch.ingredients.map(i => ['ingredients', i]),
      ...recipeSearch.tags.map(i => ['tags', i]),
    ])
    history.replace({ pathname, search: searchParams.toString() })
  }, [history, pathname, recipeSearch]);
  
  const onSubmit = async (submittedRecipeSearch: RecipeSearch) => {
    setRecipeSearch(submittedRecipeSearch);
    return null;
  }

  return (
    <Container className="HomePage" data-testid="HomePage">
      <Box sx={{ pb: 9 }}>
        <SearchPaper>
          <Grid container direction='column' justifyContent='center' alignItems='center'>
            <Grid item>
              <AutoForm
                placeholder={true}
                schema={bridge}
                model={recipeSearch}
                /*
                // @ts-ignore */
                onSubmit={onSubmit}
              >
                <AutoField name="name" />
                <AutoField name="source" />
                <ListField name="ingredients" />
                <ListField name="tags" />
                <SubmitField />
              </AutoForm>
            </Grid>
            {/* <Grid item> */}
            {/*  <SpeechInput /> */}
            {/* </Grid> */}
          </Grid>
        </SearchPaper>
        <RecipesList recipeSearch={recipeSearch} />
      </Box>
    </Container>
  );
}
