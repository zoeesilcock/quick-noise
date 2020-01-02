import React from 'react';

import { renderWithRedux } from '../../../setupTests';

import NoiseContainer from '../NoiseContainer';

it('renders without crashing', () => {
  const initialState = { noise: { isPlaying: false, volume: '-10' } };
  renderWithRedux(<NoiseContainer />, { initialState });
});
