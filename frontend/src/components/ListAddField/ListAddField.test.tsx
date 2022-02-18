import React from 'react';
import { shallow } from 'enzyme';
import ListAddField from './ListAddField';

describe('<ListAddField />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<ListAddField />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
