import React from 'react';
import { shallow } from 'enzyme';
import FoodCandidateList from './FoodCandidateList';

describe('<FoodCandidateList />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<FoodCandidateList />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
