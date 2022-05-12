/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: Component: src/pages/SaveRecipePage/SaveRecipePage.test.tsx

Created with;
$ npx generate-react-cli component SaveRecipePage --type=page

*/

import React from 'react'
import { shallow } from 'enzyme'
import SaveRecipePage from './SaveRecipePage'

const routeComponentPropsMock = {
  history: {
    location: {
      pathname: '/SaveRecipePage'
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  location: {} as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  match: {} as any,
}
describe('<SaveRecipePage />', () => {
  let component

  beforeEach(() => {
    component = shallow(<SaveRecipePage {...routeComponentPropsMock} />)
  })

  test('It should mount', () => {
    expect(component.length).toBe(1)
  })
})
