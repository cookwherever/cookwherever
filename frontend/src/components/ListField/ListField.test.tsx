import React from 'react';
import { shallow } from 'enzyme';
import ListField from './ListField';

describe('<ListField />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<ListField />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
