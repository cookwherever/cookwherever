/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: Component: src/pages/ViewIngredientPage/ViewIngredientPage.test.tsx

Created with;
$ npx generate-react-cli component ViewIngredientPage --type=page

*/

import React from 'react'
import { shallow } from 'enzyme'
import ViewIngredientPage from './ViewIngredientPage'

const routeComponentPropsMock = {
  history: {
    location: {
      pathname: '/ViewIngredientPage'
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  location: {} as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  match: {} as any,
}
describe('<ViewIngredientPage />', () => {
  let component

  beforeEach(() => {
    component = shallow(<ViewIngredientPage {...routeComponentPropsMock} />)
  })

  test('It should mount', () => {
    expect(component.length).toBe(1)
  })
})
