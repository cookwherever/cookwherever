import React from "react";
import {useQuery} from "@wasp/queries";
import {typedViewRecipe} from "../../types/queries";
import {PageLayout} from "../../PageLayout";
import {DisplayMedium, HeadingMedium} from "baseui/typography";
import {Cell, Grid} from "baseui/layout-grid";
import {Block} from "baseui/block";
import {domToReact, Element, HTMLReactParserOptions,} from "html-react-parser";
import {useStyletron} from "baseui";
import {NumberedStep, ProgressSteps} from "baseui/progress-steps";
import {Ingredients} from "./Ingredients";
import {Button, ButtonProps, KIND, SHAPE, SIZE} from "baseui/button";

interface Props {
	match: {
		params: {
			id: string;
		};
	};
}

function SpacedButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      shape={SHAPE.pill}
      kind={KIND.secondary}
      size={SIZE.compact}
      overrides={{
        BaseButton: {
          style: ({$theme}) => ({
            marginLeft: $theme.sizing.scale200,
            marginRight: $theme.sizing.scale200,
            marginTop: $theme.sizing.scale800,
          }),
        },
      }}
    />
  );
}

const ViewRecipePage: React.FC<Props> = ({ match: { params: { id } } }) => {
	const [css, theme] = useStyletron();
	const [current, setCurrent] = React.useState(0);

	const { data, isFetching, error } = useQuery(typedViewRecipe, {
		id,
	});

	if (!data) {
		return <>Recipe not found!</>;
	}

	const markColorLookup: Record<string, string> = {
		ACTION: "#8594e4",
		EQUIPMENT: "#72e8e1",
		INGREDIENT: "#f27370",
		DURATION: "#fa9856",
		MEASUREMENT: "#ede862",
		TEMPERATURE: "#cbf078",
	};

	const options: HTMLReactParserOptions = {
		// @ts-ignore
		replace: (node: Element): any => {
			if (node.name !== "mark" || !node.attribs || !node.attribs["name"]) {
				return node;
			}
			const markName = node.attribs["name"];
			const markColor = markColorLookup[markName];

			const onClick = () => {};

			return (
				<span style={{ backgroundColor: markColor }} onClick={onClick}>
					{domToReact(node.children)}
				</span>
			);
		},
	};

	const recipe = data.recipe;
	return (
		<>
			<Grid gridMargins={[0]}>
				<Cell span={[4]}>
					<Block
						height={["20px", "40px", "80px", "160px"]}
						backgroundImage={`url("${encodeURI(
							recipe.imageUrl || "https://picsum.photos/id/292/800/800",
						)}")`}
						backgroundSize={"contain"}
						backgroundRepeat={"no-repeat"}
					/>
				</Cell>
				<Cell
					span={[8]}
					overrides={{ Cell: { style: { alignSelf: "center" } } }}
				>
					<DisplayMedium>{recipe.name}</DisplayMedium>
					<p>
						from <a href={recipe.sourcePath}>{recipe.source.name}</a>
					</p>
				</Cell>
			</Grid>
			<Grid>
				<Cell span={[12]}>
					<HeadingMedium>Ingredients</HeadingMedium>
					<Ingredients recipeIngredients={recipe.recipeIngredients} />
				</Cell>
			</Grid>
			<Grid>
				<Cell span={[12]}>
					<HeadingMedium>Directions</HeadingMedium>
					<ProgressSteps current={current}>
						{recipe.recipeDirections
							.sort((a, b) => a.sequence - b.sequence)
							.map((i) => (
								<NumberedStep
									key={i.id}
									title={i.text}
								>
									<div>
										{/*{i.formattedText ? parse(i.formattedText, options) : i.text}*/}
										<ul>
											{i.ingredients.map((ingredient) => (
												<li>{ingredient.ingredient?.text}</li>
											))}
										</ul>
										<SpacedButton onClick={() => setCurrent(current - 1)}>
											Previous
										</SpacedButton>
										<SpacedButton onClick={() => setCurrent(current + 1)}>
											Next
										</SpacedButton>
									</div>
								</NumberedStep>
							))}
					</ProgressSteps>
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
