import React, { useState } from "react";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { DisplayMedium } from "baseui/typography";
import { Button } from "baseui/button";
import { Banner } from "baseui/banner";
import { PageLayout } from "../../PageLayout";
import { IngredientsList } from "./IngredientsList";
import { DirectionsList } from "./DirectionsList";
import { typedCreateRecipe } from "../../types/actions";
import {
	CreateRecipeDirection,
	CreateRecipeIngredient,
	CreateRecipeRequest,
} from "@wasp/shared/types/actions";
import { Link } from "react-router-dom";

interface Props {}

const SaveRecipePage: React.FC<Props> = ({}) => {
	const [savedRecipeId, setSavedRecipeId] = useState<string | null>(null);

	const [recipe, setRecipe] = useState<CreateRecipeRequest>({
		directions: [],
		ingredients: [],
		name: "",
		source: "",
		sourcePath: "",
		imageUrl: "",
	});

	const setIngredients = (ingredients: CreateRecipeIngredient[]) => {
		setRecipe({
			...recipe,
			ingredients,
		});
	};

	const setDirections = (directions: CreateRecipeDirection[]) => {
		setRecipe({
			...recipe,
			directions,
		});
	};

	const handleSubmit = async (event: any) => {
		try {
			const resp = await typedCreateRecipe(recipe);
			setSavedRecipeId(resp.id);
		} catch (err: any) {
			window.alert("Error: " + err.message);
		}
	};

	return (
		<>
			<DisplayMedium>Save a Recipe</DisplayMedium>
			{savedRecipeId && (
				<Banner>
					Recipe saved! View it{" "}
					<Link to={`/recipe/view/${savedRecipeId}`}>here</Link>.
				</Banner>
			)}
			<>
				<FormControl label={() => "name"}>
					<Input
						onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
					/>
				</FormControl>
				<FormControl label={() => "source"}>
					<Input
						onChange={(e) => setRecipe({ ...recipe, source: e.target.value })}
					/>
				</FormControl>
				<FormControl label={() => "image"}>
					<Input
						onChange={(e) => setRecipe({ ...recipe, imageUrl: e.target.value })}
					/>
				</FormControl>
				<hr />
				<IngredientsList
					ingredients={recipe.ingredients}
					setIngredients={setIngredients}
				/>
				<hr />
				<DirectionsList
					directions={recipe.directions}
					setDirections={setDirections}
				/>
				<hr />
				<Button onClick={handleSubmit}>Save</Button>
			</>
		</>
	);
};

export default () => (
	<PageLayout>
		<SaveRecipePage />
	</PageLayout>
);
