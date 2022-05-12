import React, { useRef, useState } from 'react'


import { gql, useMutation } from '@apollo/client';

import { GraphQLBridge } from 'uniforms-bridge-graphql'
import { AutoForm } from 'uniforms-material'
import { buildASTSchema } from 'graphql'

import { Container, Paper } from '@mui/material';
import { styled } from '@material-ui/core';
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
  Recipes_Insert_Input
} from '../../generated/graphql'
import ImageCropper from '../../widgets/ImageCropper/ImageCropper';

const CozyPaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  padding: '3em',
  margin: '1em'
}));

const recipeSchema = gql`
  type RecipeDirection {
    step: String
  }

  type RecipeIngredient {
    text: String
  }

  type RecipeIngredientsGroup {
    name: String
    group_ingredients: [RecipeIngredient]!
  }

  type RecipeTag {
    name: String
  }

  type Recipe {
    name: String!
    source: String
    recipe_directions: [RecipeDirection]!
    recipe_ingredient_groups: [RecipeIngredientsGroup]!
    recipe_tags: [RecipeTag]!
  }

  type Query {
    anything: ID
  }
`

const schemaType = buildASTSchema(recipeSchema).getType('Recipe')
const schemaExtras = {
  recipe_directions: {
    label: 'Directions',
  },
  recipe_ingredient_groups: {
    label: 'Ingredient Groups',
  },
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

  const [formRecipe, setFormRecipe] = useState<Recipes>({
    recipe_direction_durations_aggregate: { nodes: [] },
    recipe_directions_aggregate: { nodes: [] },
    recipe_ingredient_groups_aggregate: { nodes: [] },
    recipe_tags_aggregate: { nodes: [] },
    __typename: 'recipes',
    created_at: undefined,
    extraction_metadata: undefined,
    id: 0,
    image: undefined,
    name: '',
    recipe_direction_durations: [],
    recipe_directions: [],
    recipe_ingredient_groups: [],
    recipe_tags: [],
    source: '',
    updated_at: undefined,
    visible: true,
  });
  const [create, { loading, error }] = useMutation(INSERT_RECIPE)

  const onSubmit = async (recipe: Recipes) => {
    setFormRecipe(recipe)

    const formatRecipeIngredientGroup = (group: Recipe_Ingredient_Groups, idx: number): Recipe_Ingredient_Groups_Insert_Input => {
      return {
        seq_num: idx,
        name: group.name,
        group_ingredients: {
          data: group.group_ingredients.map((ingredient, ingredientIdx): Recipe_Ingredients_Insert_Input => {
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

    const newRecipe: Recipes_Insert_Input = {
      name: recipe.name,
      source: recipe.source,
      image: recipe.image,
      recipe_directions: {
        data: recipe.recipe_directions.map((direction, idx) => {
          return {
            ...direction,
            seq_num: idx,
            recipe_direction_actions: {
              data: direction.recipe_direction_actions
            }
          }
        }),
        on_conflict:
          {
            constraint: Recipe_Directions_Constraint.RecipeDirectionsRecipeIdSeqNumKey,
            update_columns: [Recipe_Directions_Update_Column.Step]
          }
      },
      recipe_tags: {
        data: recipe.recipe_tags.map((tag, idx) => {
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
        data: recipe.recipe_ingredient_groups.map(formatRecipeIngredientGroup),
        on_conflict: {
          constraint: Recipe_Ingredient_Groups_Constraint.RecipeIngredientGroupsRecipeIdSeqNumKey,
          update_columns: [Recipe_Ingredient_Groups_Update_Column.Name]
        }
      }
    }

    const resp = await create({
      variables: {
        recipe: newRecipe
      }
    })
    console.log(resp)
  }

  return (
    <Container>
      <CozyPaper>
        <AutoForm
          placeholder={true}
          schema={bridge}
          model={formRecipe}
          // @ts-ignore
          onSubmit={onSubmit}
        />
        <p>{progress}</p>
        <p>{text}</p>
        <ImageCropper setProgress={setProgress} setText={setText} />
      </CozyPaper>
    </Container>
  )
}