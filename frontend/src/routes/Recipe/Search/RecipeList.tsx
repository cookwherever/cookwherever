import React from 'react';
import {useLazyLoadQuery} from "react-relay";
import {graphql} from "relay-runtime";
import {FlexGrid, FlexGridItem} from "baseui/flex-grid";
import {MessageCard} from "baseui/message-card";
import {RecipeListQuery} from "./__generated__/RecipeListQuery.graphql";
import {useNavigate} from "react-router-dom";

interface Props {
  search: string
}
export const RecipeList: React.FC<Props> = ({ search }) => {
  const navigate = useNavigate();

  const data = useLazyLoadQuery<RecipeListQuery>(graphql`
              query RecipeListQuery($search: String!) {
                  recipeRecipe (where: { name: {_ilike: $search}}) {
                      id
                      name
                      source_provider {
                          name
                      }
                  }
              }`,
    {
      search: `%${search}%`,
    });

  const viewRecipe = (id: string | number) => {
    navigate(`/recipe/view/${id}`);
  };

  return (
    <FlexGrid
      flexGridColumnCount={3}
    >
      {data.recipeRecipe.map(r => (
        <FlexGridItem key={r.id}>
          <MessageCard
            heading={r.name}
            buttonLabel='Make it!'
            onClick={() => viewRecipe(r.id)}
            paragraph={r.source_provider.name}
          />
        </FlexGridItem>
      ))}
    </FlexGrid>
  );
};
