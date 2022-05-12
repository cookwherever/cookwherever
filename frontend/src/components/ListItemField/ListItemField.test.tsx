import React from 'react';
import { shallow } from 'enzyme';
import ListItemField from './ListItemField';

describe('<ListItemField />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<ListItemField />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
