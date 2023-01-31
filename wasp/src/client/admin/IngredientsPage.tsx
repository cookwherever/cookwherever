import { useQuery } from "@wasp/queries";
import React, { useState } from "react";
import { PageLayout } from "../PageLayout";
import { typedAdminIngredients } from "../types/queries";
import { Button } from "baseui/button";
import { ListItem } from "baseui/list";
import {
	typedSearchFoodForIngredient,
	typedUpsertIngredientFood,
} from "../types/actions";
import { IngredientSearchResponseFood } from "../../shared/types/actions";
import { Banner } from "baseui/banner";
import { Input } from "baseui/input";
import { DisplayXSmall } from "baseui/typography";
import { Cell, Grid } from "baseui/layout-grid";
import { Spinner } from "baseui/spinner";

const IngredientsPage: React.FC = () => {
	const [foods, setFoods] = useState<IngredientSearchResponseFood[]>([]);
	const [search, setSearch] = useState<string | undefined>(undefined);
	const [ingredient, setIngredient] = useState<string | null>(null);
	const [updatedIngredient, setUpdatedIngredient] = useState<string | null>(
		null,
	);
	const { data, isFetching, error } = useQuery(typedAdminIngredients, {
		search,
	});

	return (
		<>
			{updatedIngredient && <Banner>Ingredient updated!</Banner>}
			<Grid>
				<Cell span={[6]}>
					<DisplayXSmall>Ingredients From Recipes</DisplayXSmall>
					<Input
						value={search}
						onChange={async (e) => {
							setSearch(e.target.value);
						}}
					/>
					{data ? (
						data.ingredients.map((i, idx) => (
							<ListItem key={idx}>
								{i.name}
								{i.count ? ` - ${i.count}` : null}
								{i.ingredient ? ` - ${i.ingredient}` : null}
								<Button
									onClick={async () => {
										if (!i.name) {
											return;
										}
										const response = await typedSearchFoodForIngredient({
											ingredient: i.name,
										});
										setIngredient(i.name);
										setFoods(response.foods);
									}}
								>
									Search
								</Button>
							</ListItem>
						))
					) : (
						<Spinner />
					)}
				</Cell>
				<Cell span={[6]}>
					<DisplayXSmall>{ingredient || "Select an ingredient"}</DisplayXSmall>
					<Input
						onChange={async (e) => {
							const response = await typedSearchFoodForIngredient({
								ingredient: e.target.value,
							});
							setFoods(response.foods);
						}}
					/>
					{foods.map((food) => (
						<ListItem key={food.id}>
							{food.description}
							<Button
								onClick={async () => {
									if (!ingredient) {
										return;
									}

									const upsertedIngredient = await typedUpsertIngredientFood({
										ingredientName: ingredient,
										foodDescription: food.description,
									});
									setUpdatedIngredient(upsertedIngredient.id);
								}}
							>
								Use for {ingredient}
							</Button>
						</ListItem>
					))}
				</Cell>
			</Grid>
		</>
	);
};

export default (props: any) => (
	<PageLayout>
		<IngredientsPage {...props} />
	</PageLayout>
);
