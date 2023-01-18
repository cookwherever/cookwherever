import {useQuery} from '@wasp/queries';
import React, {useState} from 'react';
import {PageLayout} from "../PageLayout";
import {typedAdminIngredients} from "../types/queries";
import {Button} from "baseui/button";
import {ListItem} from "baseui/list";
import {typedSearchFoodForIngredient, typedUpsertIngredientFood} from "../types/actions";
import {IngredientSearchResponseFood} from "../../shared/types/actions";
import {Banner} from "baseui/banner";
import {Input} from "baseui/input";
import {DisplayMedium} from "baseui/typography";
import {Cell, Grid} from "baseui/layout-grid";

const IngredientsPage: React.FC = () => {
  const [foods, setFoods] = useState<IngredientSearchResponseFood[]>([]);
  const [ingredient, setIngredient] = useState<string|null>(null);
  const [updatedIngredient, setUpdatedIngredient] = useState<string|null>(null);
  const { data, isFetching, error } = useQuery(typedAdminIngredients, {});

  if (!data) {
    return <>Recipe not found!</>;
  }
  return (
    <>
      {updatedIngredient && (
        <Banner>
          Ingredient updated!
        </Banner>
      )}
      <DisplayMedium>{ingredient || 'Select an ingredient'}</DisplayMedium>
      <Grid>
        <Cell span={[6]}>
          {data.ingredients.map(i => (
            <ListItem>{i.name} - {i.count} - {i.ingredient}<Button onClick={async () => {
              if (!i.name) {
                return;
              }
              const response = await typedSearchFoodForIngredient({ ingredient: i.name });
              setIngredient(i.name);
              setFoods(response.foods);
            }}>Search</Button></ListItem>
          ))}
        </Cell>
        <Cell span={[6]}>
          <Input onChange={async (e) => {
            const response = await typedSearchFoodForIngredient({ ingredient: e.target.value });
            setFoods(response.foods);
          }} />
          {foods.map(food => (
            <ListItem>{food.description}<Button onClick={async () => {
              if (!ingredient) {
                return;
              }

              const upsertedIngredient = await typedUpsertIngredientFood({
                ingredientName: ingredient,
                foodDescription: food.description,
              })
              setUpdatedIngredient(upsertedIngredient.id);
            }}>Use for {ingredient}</Button></ListItem>
          ))}
        </Cell>
      </Grid>
    </>
  );
}

export default (props: any) => (
  <PageLayout>
    <IngredientsPage {...props} />
  </PageLayout>
);
