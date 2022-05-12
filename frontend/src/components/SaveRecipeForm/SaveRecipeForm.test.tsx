import React from 'react';
import { shallow } from 'enzyme';
import {SaveRecipeForm} from './SaveRecipeForm';

describe('<SaveRecipeForm />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<SaveRecipeForm />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
