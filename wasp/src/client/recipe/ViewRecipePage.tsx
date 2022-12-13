import React from 'react';
import {useQuery} from "@wasp/queries";
import {typedViewRecipe} from "../types/queries";

interface Props {
  match: {
    params: {
      id: string
    }
  }
}

const ViewRecipePage: React.FC<Props> = ({ match: { params: { id }}}) => {
  // const handleIsDoneChange = async (event: any) => {
  //   try {
  //     await clientUpdateRecipe()
  //   } catch (error: any) {
  //     window.alert('Error while updating recipe: ' + error.message)
  //   }
  // }

  const { data, isFetching, error} = useQuery(typedViewRecipe);

  if (!data) {
    return <>Recipe not found!</>
  }

  return (
    <div>
      <h1>{data.recipe.name}</h1>
    </div>
  )
}

export default ViewRecipePage;
