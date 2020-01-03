import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react'

import NoiseToggle from '../NoiseToggle';

const props = {
  isPlaying: false,
  allowsPlaying: true,
  toggleNoise: () => {},
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NoiseToggle {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing in playing mode', () => {
  const { getByText } = render(
    <NoiseToggle {...Object.assign({}, props, { isPlaying: true })} />
  );

  const button = getByText('Toggle noise');
  expect(button.className).toEqual(expect.stringContaining('NoiseToggle-playing'));
});

it('calls the toggleNoise prop when clicked', () => {
  const toggleNoise = jest.fn();
  const { getByText } = render(
    <NoiseToggle {...Object.assign({}, props, { toggleNoise })} />
  );

  const button = getByText('Toggle noise');
  fireEvent.click(button);
  expect(toggleNoise).toHaveBeenCalledTimes(1);
});
