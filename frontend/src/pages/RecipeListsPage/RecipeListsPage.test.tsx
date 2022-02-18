/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: Component: src/pages/RecipeListsPage/RecipeListsPage.test.tsx

Created with;
$ npx generate-react-cli component RecipeListsPage --type=page

*/

import React from 'react'
import { shallow } from 'enzyme'
import RecipeListsPage from './RecipeListsPage'

const routeComponentPropsMock = {
  history: {
    location: {
      pathname: '/RecipeListsPage'
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  location: {} as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  match: {} as any,
}
describe('<RecipeListsPage />', () => {
  let component

  beforeEach(() => {
    component = shallow(<RecipeListsPage {...routeComponentPropsMock} />)
  })

  test('It should mount', () => {
    expect(component.length).toBe(1)
  })
})
