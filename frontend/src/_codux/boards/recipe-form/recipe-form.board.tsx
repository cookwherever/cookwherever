import React from 'react';
import {createBoard} from '@wixc3/react-board';
import {RecipeForm} from '../../../routes/Recipe/Search/RecipeForm';

export default createBoard({
    name: 'RecipeForm',
    Board: () => <RecipeForm />
});
