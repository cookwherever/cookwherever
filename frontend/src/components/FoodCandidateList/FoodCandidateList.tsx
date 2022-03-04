import React from 'react';

import { gql, useMutation, useQuery } from '@apollo/client';
import {
  Box,
  Grid,
  Button,
  Card,
  CardContent,
  Typography,
  Modal,
  List,
  ListItem,
  makeStyles,
  Theme,
  experimentalStyled as styled,
  InputLabel,
  FormControl,
  Select,
  MenuItem, SelectChangeEvent
} from '@mui/material';
import {
  Food,
  Food_Portion,
  Recipe_Ingredient_Food_Candidate, Recipe_Ingredient_Food_Candidate_Insert_Input,
  Recipe_Ingredients,
  Recipes
} from '../../generated/graphql';

const CandidateModal = styled(Modal)((theme) => ({
  top: '25%',
  left: '25%',
  transform: 'translate(-25%, -25%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

interface FoodCandidateListProps {
  id: number
  selectedCallback: React.Dispatch<void>
}

export const QUERY = gql`
query RecipeFoodCandidates($id: Int!) {
    recipe_ingredients_by_pk(id: $id) {
        name
        food_candidates(limit: 10) {
            fdc_id
            description
            food_portions(distinct_on: [measure_unit_id, modifier, portion_description]) {
                id
                amount
                gram_weight
                modifier
                measure_unit {
                    ml
                    name
                }
                measure_unit_id
            }
        }
    }
}
`;

// const SEARCH_FOODS_QUERY = gql`
// query SearchFoods {
//   search_foods(args: {search: $search}, limit: 10) {
//       fdc_id
//       description
//       food_portions(distinct_on: [measure_unit_id, modifier, portion_description]) {
//           id
//           amount
//           gram_weight
//           modifier
//           measure_unit {
//               ml
//               name
//           }
//           measure_unit_id
//       }
//   }
// }
// `;

const INSERT_FOOD_CANDIDATE_QUERY = gql`
    mutation InsertFoodCandidateForIngredient($object: recipe_ingredient_food_candidate_insert_input!) {
  insert_recipe_ingredient_food_candidate_one(object: $object, on_conflict: {constraint: recipe_ingredient_food_candidate_recipe_ingredient_id_food_cand, update_columns: [food_candidate_id, food_candidate_portion_id]}) {
    id
  }
}
`;

const FoodCandidate = (props: {ingredientId: number, foodCandidate: Food, setSelectedCandidate: React.Dispatch<boolean>}) => {
  const { ingredientId, foodCandidate, setSelectedCandidate } = props;

  const [create, { loading, error }] = useMutation(INSERT_FOOD_CANDIDATE_QUERY);

  const onSubmit = async (event: SelectChangeEvent) => {
    if (event.target === null) {
      throw new Error('event is null');
    }

    const idx = parseInt(event.target.value, 10);
    if (idx < 0 || idx > foodCandidate.food_portions.length) {
      throw new Error(`idx ${idx} is out of range for ${foodCandidate.food_portions}`);
    }

    const portion: Food_Portion = foodCandidate.food_portions[idx];
    const candidateInput: Recipe_Ingredient_Food_Candidate_Insert_Input = {
      recipe_ingredient_id: ingredientId,
      food_candidate_id: foodCandidate.fdc_id,
      food_candidate_portion_id: portion.id
    }

    const resp = await create({
      variables: {
        object: candidateInput
      }
    })
    setSelectedCandidate(true);
  }

  return (
    <Card>
      <CardContent>
        <Typography>
          {foodCandidate.description}
        </Typography>
        <Typography variant="body2">
          <List />
          <FormControl fullWidth>
            <InputLabel id="food-input-label">Food</InputLabel>
            <Select
              labelId="food-input-label"
              id="food-input-select"
              value=""
              label="Age"
              onChange={onSubmit}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
              {foodCandidate.food_portions.filter(portion => portion.amount).map((portion, idx) => (
                <MenuItem value={idx}>
                  {portion.gram_weight}g == {portion.amount}
                  {
                    portion.measure_unit && portion.measure_unit.name !== 'undetermined'
                      ? portion.measure_unit.name
                      : (<>{portion.portion_description} {portion.modifier}</>)
                  }
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Typography>
      </CardContent>
    </Card>
  )
}

const FoodCandidateList: React.FunctionComponent<FoodCandidateListProps> = (props) => {
  const { id, selectedCallback } = props;

  const [open, setOpen] = React.useState(false);
  const [selectedCandidate, setSelectedCandidate] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (selectedCandidate) {
    handleClose();
    setSelectedCandidate(false);
    selectedCallback();
  }

  const { loading, error, data } = useQuery(QUERY, {
    variables: {
      id
    }
  });

  if (loading) return (<h4>'Loading...'</h4>);
  if (error) return (<h4>{`Error! ${error.message}`}</h4>);

  const { recipe_ingredients_by_pk: ingredient } = data as {recipe_ingredients_by_pk: Recipe_Ingredients};

  if (!ingredient.food_candidates) {
    return (
      <>
        <Typography variant='h5'>No food candidates for recipe ingredient.</Typography>
      </>
    )
  }

  return (
    <div>
      <Button onClick={handleOpen}>Details</Button>
      <CandidateModal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ p: 7 }}>
          <Typography variant='h2'>{ingredient.name}</Typography>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {ingredient.food_candidates.map((food_candidate, idx) => (
              <Grid item xs={2} sm={4} md={4} key={`ingredient-food-candidate-group-${id}`}>
                <FoodCandidate ingredientId={id} foodCandidate={food_candidate} setSelectedCandidate={setSelectedCandidate} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </CandidateModal>
    </div>
  )
};

export default FoodCandidateList;
