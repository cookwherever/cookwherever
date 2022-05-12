import React from 'react';
import { shallow } from 'enzyme';
import SpeechInput from './SpeechInput';

describe('<SpeechInput />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<SpeechInput />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
