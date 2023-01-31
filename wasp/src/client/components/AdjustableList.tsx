import React, { useState } from "react";
import { arrayMove, arrayRemove, List } from "baseui/dnd-list";
import { Input } from "baseui/input";
import { Button, KIND } from "baseui/button";
import { useStyletron } from "baseui";

interface Props {
	name: string;
	list: string[];
	setList: (list: string[]) => void;
}

export const AdjustableList: React.FC<Props> = ({ name, list, setList }) => {
	const [listItem, setListItem] = useState<string | null>(null);
	const [css, theme] = useStyletron();

	const addItemToList = () => {
		if (listItem === null) {
			return;
		}
		setList([...list, listItem]);
	};

	return (
		<>
			<div
				className={css({
					display: "flex",
					marginBottom: 0,
				})}
			>
				<div
					className={css({
						marginRight: theme.sizing.scale800,
						flexGrow: 1,
					})}
				>
					<Input
						placeholder={name}
						value={listItem || ""}
						onChange={(e) => setListItem(e.target.value)}
						clearable
						clearOnEscape
					/>
				</div>
				<div
					className={css({
						display: "flex",
					})}
				>
					<Button onClick={addItemToList} kind={KIND.secondary}>
						Add
					</Button>
				</div>
			</div>
			<List
				items={list}
				removable
				onChange={({ oldIndex, newIndex }) =>
					setList(
						newIndex === -1
							? arrayRemove(list, oldIndex)
							: arrayMove(list, oldIndex, newIndex),
					)
				}
			/>
		</>
	);
};
