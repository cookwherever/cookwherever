import React from 'react';
import { shallow } from 'enzyme';
import ListDelField from './ListDelField';

describe('<ListDelField />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<ListDelField />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
