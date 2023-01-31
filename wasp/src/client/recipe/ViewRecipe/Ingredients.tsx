import React, {useState} from "react";
import {Check, CheckIndeterminate, Plus} from "baseui/icon";
import {Button} from "baseui/button";
import {Cell, Grid} from "baseui/layout-grid";
import {ListItem, ListItemLabel} from "baseui/list";
import {useStyletron} from "baseui";
import {RecipeIngredient} from "@wasp/shared/types/recipe";
import {typedSaveGroceryListItem} from "../../types/actions";
import {useSnackbar,} from 'baseui/snackbar';

interface Props {
	recipeIngredients: RecipeIngredient[];
}

export const Ingredients: React.FC<Props> = ({ recipeIngredients }) => {
	const [css, theme] = useStyletron();
	const {enqueue} = useSnackbar();

	const [completedIngredients, setCompletedIngredients] = useState<number[]>(
		[],
	);

	return (
		<Grid>
			{recipeIngredients
				.sort((a, b) => a.sequence - b.sequence)
				.map((recipeIngredient) => {
					const ingredientCompleted = completedIngredients.some(
						(sequence) => sequence === recipeIngredient.sequence,
					);
					const toggleIngredientComplete = () => {
						if (ingredientCompleted) {
							setCompletedIngredients(
								completedIngredients.filter(
									(sequence) => sequence !== recipeIngredient.sequence,
								),
							);
						} else {
							setCompletedIngredients([...completedIngredients, recipeIngredient.sequence]);
						}
					};

					const addToGroceryList = async () => {
						try {
							const resp = await typedSaveGroceryListItem({
								text: recipeIngredient.text,
								recipeIngredientId: recipeIngredient.id,
							});

							enqueue({
								message: !resp.existingItem ? 'Saved to Grocery List.' : 'Grocery is already in list.',
								startEnhancer: ({size}) => <Check size={size} />,
							});
						} catch (e) {
							console.error(e);
							enqueue({
								message: 'Failed to save to grocery list.',
								startEnhancer: ({size}) => <CheckIndeterminate size={size} />,
							});
						}
					}
					return (
						<Cell span={6}>
							<ListItem
								key={recipeIngredient.id}
								endEnhancer={() => (
									<Button shape="round" size="compact" kind="secondary" onClick={addToGroceryList}>
										{ingredientCompleted ? <CheckIndeterminate /> : <Plus />}
									</Button>
								)}
							>
								<ListItemLabel>
									<label onClick={toggleIngredientComplete}>
										<div
											className={css(
												ingredientCompleted
													? { textDecoration: "line-through" }
													: {},
											)}
										>
											{recipeIngredient.text}
										</div>
										{recipeIngredient.calculatedMass ? (
											<> | {recipeIngredient.calculatedMass.toFixed(2)} grams</>
										) : null}
									</label>
								</ListItemLabel>
							</ListItem>
						</Cell>
					);
				})}
		</Grid>
	);
};
