/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/pages/SaveRecipePage/SaveRecipePage.tsx

Created with;
$ npx generate-react-cli component SaveRecipePage --type=page

*/

import React from 'react'
import './SaveRecipePage.scss'
import { SaveRecipeForm } from '../../components/SaveRecipeForm/SaveRecipeForm';

interface SaveRecipePageProps {

}

export const SaveRecipePage: React.FunctionComponent<SaveRecipePageProps> = (props) => {
  return (
    <div className="SaveRecipePage" data-testid="SaveRecipePage">
      <h1>Save Recipe</h1>
      <SaveRecipeForm />
    </div>
  );
}
