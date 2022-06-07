/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/pages/SaveRecipePage/SaveRecipePage.tsx

Created with;
$ npx generate-react-cli component SaveRecipePage --type=page

*/

import React from 'react'

import { SaveRecipeForm } from '../../components/SaveRecipeForm/SaveRecipeForm';
import {Container} from "react-bootstrap";

interface SaveRecipePageProps {

}

export const SaveRecipePage: React.FunctionComponent<SaveRecipePageProps> = (props) => {
  return (
    <Container className="SaveRecipePage" data-testid="SaveRecipePage">
      <h1>Save Recipe</h1>
      <SaveRecipeForm />
    </Container>
  );
}
