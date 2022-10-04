import React, { useEffect, useState } from 'react'

import { useHistory, useLocation } from 'react-router-dom';
import { Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import ListInput from 'src/components/ListInput';
import useDebouncedCallback from '@restart/hooks/useDebouncedCallback';
import { gql } from '@apollo/client';
import { RecipesList } from '../components/RecipesList';
import { RecipeSearch } from '../types/component-types';
import { useGetRecipeSourceProvidersQuery, useViewRecipeQueryQuery } from '../generated/graphql';

interface HomePageProps {

}

interface RecipeSearchFormProps {
  recipeSearch: RecipeSearch
  setRecipeSearch: React.Dispatch<RecipeSearch>
}

const GET_RECIPE_SOURCE_PROVIDERS = gql`
query GetRecipeSourceProviders {
  recipe_source_providers(order_by: {name: asc}) {
    id
    name
  }
}
`

const RecipeSearchForm: React.FunctionComponent<RecipeSearchFormProps> = ({ recipeSearch, setRecipeSearch }) => {
  const { loading, error, data } = useGetRecipeSourceProvidersQuery();

  if (error || !data) {
    console.error(error);
    return (<>unable to get recipe source providers</>)
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    return null;
  }
  return (
    <Form noValidate validated={false} onSubmit={onSubmit}>
      <Row className='my-2'>
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Recipe Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Apple Pie"
            defaultValue={recipeSearch.name || undefined}
            onChange={(e) => {
              setRecipeSearch({
                ...recipeSearch,
                name: e.target.value,
              })
            }}
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Source Name</Form.Label>
          <Form.Select
            onChange={(e) => {
              setRecipeSearch({
                ...recipeSearch,
                source: e.target.value,
              })
            }}
          >
            {data.recipe_source_providers.map(provider => (
              <option key={provider.id} value={provider.id}>
                {provider.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Row>
      <Row className='my-2'>
        <Col md="6">
          <Form.Label>Recipes that have these ingredients</Form.Label>
          <ListInput
            header="Ingredients"
            placeholder="Apples"
            value={recipeSearch.ingredients || []}
            onChange={(ingredients) => {
              setRecipeSearch({
                ...recipeSearch,
                ingredients,
              })
            }}
          />
        </Col>
        <Col md="6">
          <Form.Label>Recipes that have these tags</Form.Label>
          <ListInput
            header="Tags"
            placeholder="Dessert"
            value={recipeSearch.tags || []}
            onChange={(tags) => {
              setRecipeSearch({
                ...recipeSearch,
                tags,
              })
            }}
          />
        </Col>
      </Row>
    </Form>
  )
}

export const HomePage: React.FunctionComponent<HomePageProps> = (props) => {
  const { search, pathname } = useLocation();
  const history = useHistory();

  const urlSearchParams = new URLSearchParams(search);

  const [recipeSearch, setRecipeSearch] = useState<RecipeSearch>({
    name: urlSearchParams.get('name') || '',
    source: urlSearchParams.get('source') || '',
    ingredients: urlSearchParams.getAll('ingredients'),
    tags: urlSearchParams.getAll('tags'),
  });

  const debouncedRecipeSearch = useDebouncedCallback(setRecipeSearch, 500);

  useEffect(() => {
    const searchParams = new URLSearchParams([
      ['name', recipeSearch.name],
      ['source', recipeSearch.source],
      ...recipeSearch.ingredients.map(i => ['ingredients', i]),
      ...recipeSearch.tags.map(i => ['tags', i]),
    ])
    history.replace({ pathname, search: searchParams.toString() })
  }, [history, pathname, recipeSearch]);

  return (
    <Container>
      <h1 className='text-center my-2'>Cook Wherever</h1>
      <Row>
        <RecipeSearchForm recipeSearch={recipeSearch} setRecipeSearch={debouncedRecipeSearch} />
        {/* <Grid item> */}
        {/*  <SpeechInput /> */}
        {/* </Grid> */}
      </Row>
      <Row>
        <RecipesList recipeSearch={recipeSearch} />
      </Row>
    </Container>
  );
}
