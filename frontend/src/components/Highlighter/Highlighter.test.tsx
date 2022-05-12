import React from 'react';
import { shallow } from 'enzyme';
import Highlighter from './Highlighter';

describe('<Highlighter />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Highlighter />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
