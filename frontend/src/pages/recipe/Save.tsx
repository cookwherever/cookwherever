import React from 'react'

import { Container } from 'react-bootstrap';
import { RecipeForm } from './Save/RecipeForm';

export const Save = () => {
  return (
    <Container className="SaveRecipePage" data-testid="SaveRecipePage">
      <h1>Save Recipe</h1>
      <RecipeForm />
    </Container>
  );
}
