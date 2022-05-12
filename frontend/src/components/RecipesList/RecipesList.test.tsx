/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/component/RecipesList/RecipesList.test.tsx
*/

import React from 'react'
import { shallow } from 'enzyme'
import RecipesList from './RecipesList'

describe('<RecipesList />', () => {
  let component

  beforeEach(() => {
    component = shallow(<RecipesList />)
  });

  test('It should mount', () => {
    expect(component.length).toBe(1)
  })
})
