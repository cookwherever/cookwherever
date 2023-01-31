import React from "react";
import { ListRecipesRecipe } from "@wasp/shared/types/recipe";
import { Link, useHistory } from "react-router-dom";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { MessageCard } from "baseui/message-card";
import { useStyletron } from "baseui";

interface Props {
	recipes: ListRecipesRecipe[];
}

const RecipeList: React.FC<Props> = ({ recipes }) => {
	const history = useHistory();
	const [css, theme] = useStyletron();

	if (!recipes.length) {
		return (
			<p>
				There are no recipes! Try making one{" "}
				<Link to={"/recipe/save"}>here</Link>.
			</p>
		);
	}

	const viewRecipe = (id: string) => {
		history.push(`/recipe/${id}`);
	};

	return (
		<FlexGrid flexGridColumnCount={[1, 1, 4]}>
			{recipes.map((r) => (
				<FlexGridItem key={r.id}>
					<div
						className={css({
							padding: theme.sizing.scale300,
						})}
					>
						<MessageCard
							heading={r.name}
							buttonLabel='Make it!'
							onClick={() => viewRecipe(r.id)}
							paragraph={r.source.name}
							image={{
								src: `"${encodeURI(
									r.imageUrl || "https://picsum.photos/id/292/800/800",
								)}"`,
								ariaLabel: "recipe image",
							}}
						/>
					</div>
				</FlexGridItem>
			))}
		</FlexGrid>
	);
};

export default RecipeList;
