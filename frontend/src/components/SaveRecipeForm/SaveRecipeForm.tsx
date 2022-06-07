import React, { useRef, useState } from 'react'


import { gql, useMutation } from '@apollo/client';

import { Col, Container, Row } from 'react-bootstrap';
import Form from '@rjsf/bootstrap-4';
import { JSONSchema7 } from 'json-schema';
import { IChangeEvent, ISubmitEvent } from '@rjsf/core';
import {
  Recipe_Directions_Constraint,
  Recipe_Directions_Update_Column, Recipe_Ingredient_Groups,
  Recipe_Ingredient_Groups_Constraint,
  Recipe_Ingredient_Groups_Insert_Input,
  Recipe_Ingredient_Groups_Update_Column,
  Recipe_Ingredients_Constraint, Recipe_Ingredients_Insert_Input,
  Recipe_Ingredients_Update_Column,
  Recipe_Tags_Constraint,
  Recipe_Tags_Update_Column,
  Recipes,
  Recipes_Insert_Input, useInsertRecipeMutation
} from '../../generated/graphql'
import ImageCropper from '../../widgets/ImageCropper/ImageCropper';
import slugify from "slugify";

const recipeSchema: JSONSchema7 = {
  'title': 'Recipe',
  'type': 'object',
  'required': [],
  'properties': {
    'name': { 'type': 'string' },
    'source': { 'type': 'string' },
    'recipe_directions': {
      'type': 'array',
      'items': { '$ref': '#/definitions/RecipeDirection' }
    },
    'recipe_ingredient_groups': {
      'type': 'array',
      'items': { '$ref': '#/definitions/RecipeIngredientsGroup' }
    },
    'recipe_tags': {
      'type': 'array',
      'items': { '$ref': '#/definitions/RecipeTag' }
    }
  },
  'definitions': {
    'RecipeDirection': {
      'type': 'object',
      'properties': {
        'step': { 'type': 'string' }
      }
    },
    'RecipeIngredient': {
      'type': 'object',
      'properties': {
        'text': { 'type': 'string' }
      }
    },
    'RecipeIngredientsGroup': {
      'type': 'object',
      'properties': {
        'name': { 'type': 'string' },
        'group_ingredients': {
          'type': 'array',
          'items': { '$ref': '#/definitions/RecipeIngredient' }
        }
      }
    },
    'RecipeTag': {
      'type': 'object',
      'properties': {
        'name': { 'type': 'string' }
      }
    }
  }
};

const uiSchema = {
  'recipe_directions': {
    'items': {
      'step': {
        'ui:widget': 'textarea'
      }
    }
  }
};

const INSERT_RECIPE = gql`
  mutation InsertRecipe(
    $recipe: recipes_insert_input!,
  ) {
    insert_recipes_one(
      object: $recipe,
      on_conflict: {
        constraint: recipes_source_key,
        update_columns: [name, image, extraction_metadata, updated_at],
      }
    ) {
      id
    }
  }
`

export const SaveRecipeForm = () => {
  const [text, setText] = useState('');
  const [progress, setProgress] = useState('');
  const [formData, setFormData] = useState<Recipes | null>(null);

  const [create, { data, loading, error }] = useInsertRecipeMutation();

  const onSubmit = async (e: ISubmitEvent<Recipes>, event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const recipe = formData;
    if (recipe === null) {
      return;
    }

    const formatRecipeIngredientGroup = (group: Recipe_Ingredient_Groups, idx: number): Recipe_Ingredient_Groups_Insert_Input => {
      return {
        seq_num: idx,
        name: group.name,
        group_ingredients: {
          // HACK (breadchris) until types are picked up correctly, recipe_directions is not seen as nullable
          data: (group.group_ingredients || []).map((ingredient, ingredientIdx): Recipe_Ingredients_Insert_Input => {
            return {
              seq_num: ingredientIdx,
              text: ingredient.text,
            }
          }),
          on_conflict: {
            constraint: Recipe_Ingredients_Constraint.RecipeIngredientsGroupIdSeqNumKey,
            update_columns: [Recipe_Ingredients_Update_Column.Text]
          }
        }
      }
    }

    const slug = slugify(recipe.name);

    const newRecipe: Recipes_Insert_Input = {
      name: recipe.name,
      source: recipe.source,
      image: recipe.image,
      slug: recipe.slug,
      recipe_directions: {
        // HACK (breadchris) until types are picked up correctly, recipe_directions is not seen as nullable
        data: (recipe.recipe_directions || []).map((direction, idx) => {
          return {
            ...direction,
            seq_num: idx,
          }
        }),
        on_conflict:
          {
            constraint: Recipe_Directions_Constraint.RecipeDirectionsRecipeIdSeqNumKey,
            update_columns: [Recipe_Directions_Update_Column.Step]
          }
      },
      recipe_tags: {
        // HACK (breadchris) until types are picked up correctly, recipe_directions is not seen as nullable
        data: (recipe.recipe_tags || []).map((tag, idx) => {
          return {
            ...tag,
            seq_num: idx
          }
        }),
        on_conflict: {
          constraint: Recipe_Tags_Constraint.RecipeTagsRecipeIdNameKey,
          update_columns: [Recipe_Tags_Update_Column.Name]
        }
      },
      recipe_ingredient_groups: {
        // HACK (breadchris) until types are picked up correctly, recipe_directions is not seen as nullable
        data: (recipe.recipe_ingredient_groups || []).map(formatRecipeIngredientGroup),
        on_conflict: {
          constraint: Recipe_Ingredient_Groups_Constraint.RecipeIngredientGroupsRecipeIdSeqNumKey,
          update_columns: [Recipe_Ingredient_Groups_Update_Column.Name]
        }
      }
    }

    try {
      const resp = await create({
        variables: {
          recipe: newRecipe
        }
      })
    } catch (e) {
      console.error(e);
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
        <p>{progress}</p>
        <p>{text}</p>
        <ImageCropper setProgress={setProgress} setText={setText} />
      </>
    </Container>
  )
}