import React, { useEffect, useState } from 'react'

import { AutoField, AutoForm, ListField, SubmitField } from 'uniforms-material';
import { gql } from '@apollo/client';
import { buildASTSchema } from 'graphql';
import { GraphQLBridge } from 'uniforms-bridge-graphql';
import { useHistory, useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import ListInput from 'src/components/ListInput';
import { Recipes } from '../../generated/graphql';
import SpeechInput from '../../components/SpeechInput/SpeechInput';
import { RecipesList } from '../../components/RecipesList/RecipesList';
import { RecipeSearch } from '../../types/component-types';
import {getRefreshedToken} from "../../utils/auth";

interface HomePageProps {

}

interface RecipeSearchFormProps {
  recipeSearch: RecipeSearch
  setRecipeSearch: React.Dispatch<RecipeSearch>
}

const RecipeSearchForm: React.FunctionComponent<RecipeSearchFormProps> = ({ recipeSearch, setRecipeSearch }) => {
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
            placeholder="Recipe Name"
            defaultValue="Apple Pie"
            onChange={(e) => {
              setRecipeSearch({
                ...recipeSearch,
                name: e.target.value
              })
            }}
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Source Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Source Name"
            defaultValue="americastestkitchen.com"
            onChange={(e) => {
              setRecipeSearch({
                ...recipeSearch,
                source: e.target.value
              })
            }}
          />
        </Form.Group>
      </Row>
      <Row className='my-2'>
        <Col md="6">
          <Form.Label>Recipes that have these ingredients</Form.Label>
          <ListInput
            header="Ingredients"
            placeholder="Apples"
            onChange={(ingredients) => {
              setRecipeSearch({
                ...recipeSearch,
                ingredients
              })
            }}
          />
        </Col>
        <Col md="6">
          <Form.Label>Recipes that have these tags</Form.Label>
          <ListInput
            header="Tags"
            placeholder="Dessert"
            onChange={(tags) => {
              setRecipeSearch({
                ...recipeSearch,
                tags
              })
            }}
          />
        </Col>
      </Row>
    </Form>
  )
}

export const HomePage: React.FunctionComponent<HomePageProps> = (props) => {
  const { search, pathname, hash } = useLocation();
  const history = useHistory();

  const params = new URLSearchParams(hash.replace('#', ''));
  console.log(hash, params);
  const refreshToken = params.get('refreshToken')

  useEffect(() => {
    if (refreshToken) {
      getRefreshedToken(refreshToken);
    }
  }, [refreshToken])

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

  return (
    <Container>
      <h1 className='text-center my-2'>Cook Wherever</h1>
      <Row>
        <RecipeSearchForm recipeSearch={recipeSearch} setRecipeSearch={setRecipeSearch} />
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
