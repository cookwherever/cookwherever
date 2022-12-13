import React, {useState} from 'react';

import {JSONSchema7} from 'json-schema';
import {graphql} from 'relay-runtime';
import {useMutation} from 'react-relay';
import {Spinner} from "baseui/spinner";
import {IChangeEvent} from "@rjsf/core";
import validator from '@rjsf/validator-ajv6';
import Form from '@rjsf/bootstrap-4';
import {RecipeFormMutation, RecipeRecipeInsertInput} from "./__generated__/RecipeFormMutation.graphql";

// https://www.npmjs.com/package/json-schema-to-typescript
const recipeSchema: JSONSchema7 = {
  'title': 'Recipe',
  'type': 'object',
  'required': [],
  'properties': {
    'name': { 'type': 'string' },
    'sourceProvider': { 'type': 'string' },
    'sourcePath': { 'type': 'string' },
    'imageUrl': { 'type': 'string' },
    'videoUrl': { 'type': 'string' },
    'tags': {
      'type': 'array',
      'items': { '$ref': '#/definitions/Tag' },
    },
    'ingredients': {
      'type': 'array',
      'items': { '$ref': '#/definitions/Ingredient' },
    },
    'directions': {
      'type': 'array',
      'items': { '$ref': '#/definitions/Direction' },
    },
  },
  'definitions': {
    'Direction': {
      'type': 'object',
      'properties': {
        'text': { 'type': 'string' },
      },
    },
    'Ingredient': {
      'type': 'object',
      'properties': {
        'text': { 'type': 'string' },
      },
    },
    'Tag': {
      'type': 'object',
      'properties': {
        'name': { 'type': 'string' },
      },
    },
  },
};

const uiSchema = {
  'directions': {
    'items': {
      'step': {
        'ui:widget': 'textarea',
      },
    },
  },
};

const InsertRecipeMutation = graphql`
mutation RecipeFormMutation($object: RecipeRecipeInsertInput!) {
  insertRecipeRecipeOne(object: $object, onConflict: {
    constraint: recipe_name_source_path_source_provider_id_key,
    update_columns: [name, sourcePath, imageUrl],
  }) {
    id
  }
}
`;

export const RecipeForm = () => {
  const [formData, setFormData] = useState<any | null>(null);

  const [commitMutation, isMutationInFlight] = useMutation<RecipeFormMutation>(InsertRecipeMutation);

  const onSubmit = async (data: IChangeEvent, event: React.FormEvent<any>) => {
    event.preventDefault();

    const recipe = formData;
    if (recipe === null) {
      return;
    }

    const newRecipe: RecipeRecipeInsertInput = {
      name: recipe.name,
      imageUrl: recipe.imageUrl,
      sourcePath: recipe.sourcePath,
      creatorId: '492d74ea-f4f5-4a38-9a60-bb3f5a8c7c8e',
      source_provider: {
        data: {
          name: recipe.sourceProvider,
        },
        onConflict: {
          constraint: 'source_provider_name_key',
          update_columns: ['name']
        }
      },
      directions: {
        data: (recipe.directions || []).map((direction: any, idx: number) => {
          return {
            seq: idx,
            text: direction.text,
          };
        }),
        onConflict:
          {
            constraint: 'direction_recipe_id_seq_key',
            update_columns: ['recipeId', 'seq', 'text'],
          },
      },
      tags: {
        data: (recipe.tags || []).map((tag: any, idx: number) => {
          return {
            seq: idx,
            name: tag.name,
          };
        }),
        onConflict: {
          constraint: 'tags_recipe_id_name_key',
          update_columns: ['recipeId', 'name'],
        },
      },
      ingredients: {
        data: (recipe.ingredients || []).map((ingredient: any, idx: number) => {
          return {
            seq: idx,
            text: ingredient.text,
          };
        }),
        onConflict: {
          constraint: 'ingredient_recipe_id_seq_key',
          update_columns: ['recipeId', 'seq', 'text'],
        },
      },
    };

    commitMutation({
      variables: {
        object: newRecipe,
      },
    });
  };

  return (
    <>
      <Form
        schema={recipeSchema}
        uiSchema={uiSchema}
        formData={formData}
        onChange={(e: any) => {
          setFormData(e.formData);
        }}
        onSubmit={onSubmit}
        validator={validator}
      />
      {isMutationInFlight && <Spinner />}
    </>
  );
};
