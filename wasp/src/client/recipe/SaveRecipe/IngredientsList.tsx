import React, { useState } from "react";
import { arrayMove, arrayRemove, List } from "baseui/dnd-list";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { HeadingMedium } from "baseui/typography";

export interface Ingredient {
	text: string;
}

interface Props {
	ingredients: Ingredient[];
	setIngredients: (ingredients: Ingredient[]) => void;
}

export const IngredientsList: React.FC<Props> = ({
	ingredients,
	setIngredients,
}) => {
	const [ingredient, setIngredient] = useState<string | null>(null);

	const addIngredient = () => {
		if (ingredient === null) {
			return;
		}
		const newIngredient: Ingredient = {
			text: ingredient,
		};
		setIngredients([...ingredients, newIngredient]);
	};

	return (
		<>
			<HeadingMedium>Ingredients</HeadingMedium>
			<FormControl label="Ingredient">
				<Input
					id="ingredient-input"
					value={ingredient || ""}
					onChange={(e) => setIngredient(e.target.value)}
				/>
			</FormControl>
			<Button onClick={addIngredient}>Add Ingredient</Button>
			<List
				items={ingredients.map((i) => i.text)}
				removable
				onChange={({ oldIndex, newIndex }) =>
					setIngredients(
						newIndex === -1
							? arrayRemove(ingredients, oldIndex)
							: arrayMove(ingredients, oldIndex, newIndex),
					)
				}
			/>
		</>
	);
};
