import {useQuery} from "@wasp/queries";
import RecipesList from "./recipe/RecipesList";
import {typedListRecipes} from "./types/queries";
import {PageLayout} from "./PageLayout";
import React, {useState} from "react";
import {Input} from "baseui/input";
import {Button} from "baseui/button";
import {AdjustableList} from "./components/AdjustableList";
import {Cell, Grid} from "baseui/layout-grid";
import {useStyletron} from "baseui";

const MainPage: React.FC = () => {
	const [search, setSearch] = useState("");
	const [ingredients, setIngredients] = useState<string[]>([]);
	const [cursor, setCursor] = useState<string | undefined>(undefined);
	const [css, theme] = useStyletron();

	// TODO (cthompson) figure out why input box flashes when entering in text
	const [doSearch, setDoSearch] = useState("");

	const { data, isFetching, error } = useQuery(typedListRecipes, {
		search: doSearch,
		ingredients,
		cursor,
	});

	return (
		<>
			<Grid gridMargins={[1]} gridGaps={[10]}>
				<Cell span={[4]}>
					<Input
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="recipes named..."
						autoFocus
						clearable
						clearOnEscape
					/>
				</Cell>
				<Cell span={[7]}>
					<AdjustableList
						name={"recipes with..."}
						list={ingredients}
						setList={setIngredients}
					/>
				</Cell>
				<Cell span={[1]}>
					<Button onClick={() => setDoSearch(search)}>Search</Button>
				</Cell>
			</Grid>
			{data?.recipes && (
				<>
					<RecipesList recipes={data.recipes} />
					<Button
						onClick={() => {
							if (data.recipes.length === 0) {
								return;
							}
							setCursor(data.recipes[data.recipes.length - 1].id);
						}}
					>
						More Recipes
					</Button>
				</>
			)}

			{isFetching && "Fetching..."}
			{error && "Error: " + error}
		</>
	);
};

export default () => (
	<PageLayout>
		<MainPage />
	</PageLayout>
);
