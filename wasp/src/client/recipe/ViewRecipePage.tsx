import React from "react";
import {useQuery} from "@wasp/queries";
import {typedViewRecipe} from "../types/queries";
import {PageLayout} from "../PageLayout";
import {DisplayMedium, HeadingMedium} from "baseui/typography";
import {ListItem, ListItemLabel} from "baseui/list";
import {Cell, Grid} from "baseui/layout-grid";
import {Block} from "baseui/block";
import {useStyletron} from "baseui";

interface Props {
	match: {
		params: {
			id: string;
		};
	};
}

const ViewRecipePage: React.FC<Props> = ({ match: { params: { id } } }) => {
	const [css, theme] = useStyletron();

	const { data, isFetching, error } = useQuery(typedViewRecipe, {
		id,
	});

	if (!data) {
		return <>Recipe not found!</>;
	}

	const recipe = data.recipe;
	return (
		<>
			<Grid gridMargins={[0]}>
				<Cell span={[4]}>
					<Block
						height={["20px", "40px", "80px", "160px"]}
						backgroundImage={`url("${
							encodeURI(recipe.imageUrl || "https://picsum.photos/id/292/800/800")
						}")`}
						backgroundSize={"contain"}
						backgroundRepeat={"no-repeat"}
					/>
				</Cell>
				<Cell
					span={[8]}
					overrides={{ Cell: { style: { alignSelf: "center" } } }}
				>
					<DisplayMedium>{recipe.name}</DisplayMedium>
					<p>from <a href={recipe.sourcePath}>{recipe.source.name}</a></p>
				</Cell>
			</Grid>
			<Grid gridMargins={[0]}>
				<Cell span={[4]}>
					<HeadingMedium>Ingredients</HeadingMedium>
					{recipe.recipeIngredients.sort((a, b) => a.sequence - b.sequence).map((i) => (
						<ListItem key={i.id}>
							<ListItemLabel>{i.text}{i.calculatedMass ? (<> | {i.calculatedMass.toFixed(2)} grams</>) : null}</ListItemLabel>
						</ListItem>
					))}
				</Cell>
				<Cell span={[8]}>
					<HeadingMedium>Directions</HeadingMedium>
					{recipe.recipeDirections.sort((a, b) => a.sequence - b.sequence).map((i) => (
						<ListItem key={i.id} overrides={{ Content: { style: { padding: theme.sizing.scale200 } }}}>
							<ListItemLabel>{i.text}</ListItemLabel>
						</ListItem>
					))}
				</Cell>
			</Grid>
		</>
	);
};

export default (props: any) => (
	<PageLayout>
		<ViewRecipePage {...props} />
	</PageLayout>
);
