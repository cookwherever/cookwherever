import React, { useState } from 'react'

import { Col, Container, Row } from 'react-bootstrap';
import Form from '@rjsf/bootstrap-4';
import { JSONSchema7 } from 'json-schema';
import { ISubmitEvent } from '@rjsf/core';
import ImageCropper from '../../../components/ImageCropper';
import slugify from 'slugify';
import { graphql } from 'relay-runtime';
import { useMutation } from 'react-relay';
import { RecipeFormMutation } from './__generated__/RecipeFormMutation.graphql';

const recipeSchema: JSONSchema7 = {
  'title': 'Recipe',
  'type': 'object',
  'required': [],
  'properties': {
    'name': { 'type': 'string' },
    'source': { 'type': 'string' },
    'source_path': { 'type': 'string' },
    'image_url': { 'type': 'string' },
    'video_url': { 'type': 'string' },
    'recipe_directions': {
      'type': 'array',
      'items': { '$ref': '#/definitions/RecipeDirection' },
    },
    'recipe_ingredients': {
      'type': 'array',
      'items': { '$ref': '#/definitions/RecipeIngredient' },
    },
    'recipe_tags': {
      'type': 'array',
      'items': { '$ref': '#/definitions/RecipeTag' },
    },
  },
  'definitions': {
    'RecipeDirection': {
      'type': 'object',
      'properties': {
        'step': { 'type': 'string' },
      },
    },
    'RecipeIngredient': {
      'type': 'object',
      'properties': {
        'text': { 'type': 'string' },
      },
    },
    'RecipeTag': {
      'type': 'object',
      'properties': {
        'name': { 'type': 'string' },
      },
    },
  },
};

const uiSchema = {
  'recipe_directions': {
    'items': {
      'step': {
        'ui:widget': 'textarea',
      },
    },
  },
};

const InsertRecipeMutation = graphql`
mutation RecipeFormMutation($object: RecipeRecipeInsertInput!) {
  insertRecipeRecipeOne(object: $object) {
    id
  }
}
`

export const RecipeForm = () => {
  const [text, setText] = useState('');
  const [progress, setProgress] = useState('');
  const [formData, setFormData] = useState<any | null>(null);

  const [commitMutation, isMutationInFlight] = useMutation<RecipeFormMutation>(InsertRecipeMutation);

  const onSubmit = async (e: ISubmitEvent<any>, event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const recipe = formData;
    if (recipe === null) {
      return;
    }

    // const formatRecipeIngredientGroup = (group: Recipe_Ingredient_Groups, idx: number): Recipe_Ingredient_Groups_Insert_Input => {
    //   return {
    //     seq_num: idx,
    //     name: group.name,
    //     group_ingredients: {
    //       // HACK (breadchris) until types are picked up correctly, recipe_directions is not seen as nullable
    //       data: (group.group_ingredients || []).map((ingredient, ingredientIdx): Recipe_Ingredients_Insert_Input => {
    //         return {
    //           seq_num: ingredientIdx,
    //           text: ingredient.text,
    //         }
    //       }),
    //       on_conflict: {
    //         constraint: Recipe_Ingredients_Constraint.RecipeIngredientsGroupIdSeqNumKey,
    //         update_columns: [Recipe_Ingredients_Update_Column.Text],
    //       },
    //     },
    //   }
    // }

    const slug = slugify(recipe.name);
    //
    // const newRecipe: Recipes_Insert_Input = {
    //   name: recipe.name,
    //   source: recipe.source,
    //   image: recipe.image,
    //   slug: recipe.slug,
    //   recipe_directions: {
    //     // HACK (breadchris) until types are picked up correctly, recipe_directions is not seen as nullable
    //     data: (recipe.recipe_directions || []).map((direction, idx) => {
    //       return {
    //         ...direction,
    //         seq_num: idx,
    //       }
    //     }),
    //     on_conflict:
    //       {
    //         constraint: Recipe_Directions_Constraint.RecipeDirectionsRecipeIdSeqNumKey,
    //         update_columns: [Recipe_Directions_Update_Column.Step],
    //       },
    //   },
    //   recipe_tags: {
    //     // HACK (breadchris) until types are picked up correctly, recipe_directions is not seen as nullable
    //     data: (recipe.recipe_tags || []).map((tag, idx) => {
    //       return {
    //         ...tag,
    //         seq_num: idx,
    //       }
    //     }),
    //     on_conflict: {
    //       constraint: Recipe_Tags_Constraint.RecipeTagsRecipeIdNameKey,
    //       update_columns: [Recipe_Tags_Update_Column.Name],
    //     },
    //   },
    //   recipe_ingredient_groups: {
    //     // HACK (breadchris) until types are picked up correctly, recipe_directions is not seen as nullable
    //     data: (recipe.recipe_ingredient_groups || []).map(formatRecipeIngredientGroup),
    //     on_conflict: {
    //       constraint: Recipe_Ingredient_Groups_Constraint.RecipeIngredientGroupsRecipeIdSeqNumKey,
    //       update_columns: [Recipe_Ingredient_Groups_Update_Column.Name],
    //     },
    //   },
    // }

    try {
      const resp = await create({
        variables: {
          recipe: {},
        },
      })
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Container>
      <>
        <Row>
          <Col md={9}>
            <Form
              schema={recipeSchema}
              uiSchema={uiSchema}
              formData={formData}
              onChange={(e) => {
                setFormData(e.formData);
              }}
              onSubmit={onSubmit}
              onError={() => {}}
            />
          </Col>
          <Col md={3} />
        </Row>
        { error && (
          <Row>
            <p>Unable to save recipe: {error}</p>
          </Row>
        )}
        { data && (
          <Row>
            <p>Saved recipe. View it <a href={`/recipe/${data.insert_recipes_one?.id}`}>here</a>.</p>
          </Row>
        )}
        {/*<p>{progress}</p>*/}
        {/*<p>{text}</p>*/}
        {/*<ImageCropper setProgress={setProgress} setText={setText} />*/}
      </>
    </Container>
  )
}
