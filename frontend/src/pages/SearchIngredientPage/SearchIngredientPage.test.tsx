/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: Component: src/pages/SearchIngredientPage/SearchIngredientPage.test.tsx

Created with;
$ npx generate-react-cli component SearchIngredientPage --type=page

*/

import React from 'react'
import { shallow } from 'enzyme'
import SearchIngredientPage from './SearchIngredientPage'

const routeComponentPropsMock = {
  history: {
    location: {
      pathname: '/SearchIngredientPage'
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  location: {} as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  match: {} as any,
}
describe('<SearchIngredientPage />', () => {
  let component

  beforeEach(() => {
    component = shallow(<SearchIngredientPage {...routeComponentPropsMock} />)
  })

  test('It should mount', () => {
    expect(component.length).toBe(1)
  })
})
