import React from 'react';
import { createBoard } from '@wixc3/react-board';
import { RecipeSearch } from '../../../components/recipe-search/recipe-search';

export default createBoard({
    name: 'RecipeSearch',
    Board: () => <RecipeSearch></RecipeSearch>
});
