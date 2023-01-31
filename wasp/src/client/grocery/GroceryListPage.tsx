import {useQuery} from "@wasp/queries";
import React from "react";
import {PageLayout} from "../PageLayout";
import {typedViewGroceryList} from "../types/queries";
import {ListItem} from "baseui/list";
import {useStyletron} from "baseui";
import {Button} from "baseui/button";
import {CheckIndeterminate} from "baseui/icon";
import {DisplaySmall} from "baseui/typography";
import {typedMarkGroceryListItem} from "../types/actions";

const GroceryListPage: React.FC = () => {
	const [css, theme] = useStyletron();

	const { data, isFetching, error } = useQuery(typedViewGroceryList, {});

	if (!data) {
		return <>Recipe not found!</>;
	}

	return (
		<>
			<DisplaySmall>Groceries</DisplaySmall>
			{data.groceryListItems.map((item) => {
				const obtainGroceryItem = async () => {
					await typedMarkGroceryListItem({
						groceryListItemId: item.id,
					});
				}

				return (
					<div
						className={css(
						item.obtainedAt
								? { textDecoration: "line-through" }
								: {},
						)}
					>
						<ListItem endEnhancer={() => (
							<Button shape="round" size="compact" kind="secondary" onClick={obtainGroceryItem}>
								<CheckIndeterminate />
							</Button>
						)}>{item.text}</ListItem>
					</div>
				);
			})}
		</>
	);
};

export default (props: any) => (
	<PageLayout>
		<GroceryListPage {...props} />
	</PageLayout>
);
