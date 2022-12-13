import React, { useState } from "react";
import { arrayMove, arrayRemove, List } from "baseui/dnd-list";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { HeadingMedium } from "baseui/typography";
import { CreateRecipeDirection } from "../../../shared/types/actions";

interface Props {
	directions: CreateRecipeDirection[];
	setDirections: (ingredients: CreateRecipeDirection[]) => void;
}

export const DirectionsList: React.FC<Props> = ({
	directions,
	setDirections,
}) => {
	const [direction, setDirection] = useState<string | null>(null);

	const addDirection = () => {
		if (direction === null) {
			return;
		}
		const newDirection: CreateRecipeDirection = {
			text: direction,
		};
		setDirections([...directions, newDirection]);
	};

	return (
		<>
			<HeadingMedium>Directions</HeadingMedium>
			<FormControl label="Direction">
				<Input
					id="Direction-input"
					value={direction || ""}
					onChange={(e) => setDirection(e.target.value)}
				/>
			</FormControl>
			<Button onClick={addDirection}>Add Direction</Button>
			<List
				items={directions.map((i) => i.text)}
				removable
				onChange={({ oldIndex, newIndex }) =>
					setDirections(
						newIndex === -1
							? arrayRemove(directions, oldIndex)
							: arrayMove(directions, oldIndex, newIndex),
					)
				}
			/>
		</>
	);
};
