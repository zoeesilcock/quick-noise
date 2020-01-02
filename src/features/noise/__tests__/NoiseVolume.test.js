import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react'

import NoiseVolume from '../NoiseVolume';

const props = {
  volume: '-10',
  setVolume: () => {},
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NoiseVolume {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('calls the toggleNoise prop when clicked', () => {
  const setVolume = jest.fn();
  const { container } = render(
    <NoiseVolume {...Object.assign({}, props, { setVolume })} />
  );

  const newVolume = '-9';
  const slider = container.firstChild;
  fireEvent.change(slider, { target: { value: newVolume } });

  expect(setVolume).toHaveBeenCalledTimes(1);
  expect(setVolume).toHaveBeenCalledWith(newVolume);
});
