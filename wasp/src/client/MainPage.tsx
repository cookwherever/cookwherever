import { useQuery } from "@wasp/queries";
import RecipesList from "./recipe/RecipesList";
import { typedGetSearchProperties, typedListRecipes } from "./types/queries";
import { PageLayout } from "./PageLayout";
import React, { useState } from "react";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { AdjustableList } from "./components/AdjustableList";
import { Cell, Grid } from "baseui/layout-grid";
import { Combobox } from "baseui/combobox";
import { useStyletron } from "baseui";

const anySource = "Any Source";

interface SearchPropertiesProps {
	setDoSearch: (search: string) => void;
	ingredients: string[];
	setIngredients: (ingredients: string[]) => void;
	source: string;
	setSource: (source: string) => void;
}

const SearchProperties: React.FC<SearchPropertiesProps> = ({
	setDoSearch,
	ingredients,
	setIngredients,
	source,
	setSource,
}) => {
	const [search, setSearch] = useState("");

	const { data, isFetching, error } = useQuery(typedGetSearchProperties, {});

	if (!data) {
		return <>Unable to load search properties!: {error}</>;
	}

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
				<Cell span={[5]}>
					<AdjustableList
						name={"recipes with..."}
						list={ingredients}
						setList={setIngredients}
					/>
				</Cell>
				<Cell span={[3]}>
					<Combobox
						value={source}
						onChange={(nextValue) => setSource(nextValue)}
						options={[
							...data.sources.map((s) => ({
								id: s.id,
								label: s.name,
							})),
							{ id: "empty", label: anySource },
						]}
						mapOptionToString={(option) => option.label}
					/>
				</Cell>
			</Grid>
			<Grid gridMargins={[1]} gridGaps={[10]}>
				<Cell span={[1]}>
					<Button onClick={() => setDoSearch(search)}>Search</Button>
				</Cell>
			</Grid>
		</>
	);
};

const MainPage: React.FC = () => {
	const [ingredients, setIngredients] = useState<string[]>([]);
	const [source, setSource] = useState<string>(anySource);
	const [cursor, setCursor] = useState<string | undefined>(undefined);
	const [css, theme] = useStyletron();

	// TODO (cthompson) figure out why input box flashes when entering in text
	const [doSearch, setDoSearch] = useState("");

	const { data, isFetching, error } = useQuery(typedListRecipes, {
		search: doSearch,
		source: source === anySource ? undefined : source,
		ingredients,
		cursor,
	});

	return (
		<>
			<SearchProperties
				setDoSearch={setDoSearch}
				ingredients={ingredients}
				setIngredients={setIngredients}
				source={source}
				setSource={setSource}
			/>
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
