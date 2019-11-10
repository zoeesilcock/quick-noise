import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react'

import NoiseToggle from '../NoiseToggle';

const props = {
  isPlaying: false,
  toggleNoise: () => {},
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NoiseToggle {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('calls the toggleNoise prop when clicked', () => {
  const toggleNoise = jest.fn();
  const { getByText } = render(
    <NoiseToggle toggleNoise={toggleNoise} isPlaying={false} />
  );

  const button = getByText('Toggle noise');
  fireEvent.click(button);
  expect(toggleNoise).toHaveBeenCalledTimes(1);
});
