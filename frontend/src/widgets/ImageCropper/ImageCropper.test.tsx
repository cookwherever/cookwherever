/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/component/ImageCropper/ImageCropper.test.tsx

Created with;
$ npx generate-react-cli component ImageCropper --type=recoil

*/

import React from 'react'
import { shallow } from 'enzyme'
import { RecoilRoot } from 'recoil'
import ImageCropper from './ImageCropper'

describe('<ImageCropper />', () => {
  let component

  beforeEach(() => {
    component = shallow(<RecoilRoot><ImageCropper /></RecoilRoot>)
  })

  test('It should mount', () => {
    expect(component.length).toBe(1)
  })
})
