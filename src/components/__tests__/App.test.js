import React from 'react';

import { renderWithRedux } from '../../setupTests';

import * as playerSlice from '../../features/player/playerSlice';
import * as noiseSlice from '../../features/noise/noiseSlice';
import App from '../App';

it('renders without crashing', () => {
  renderWithRedux(<App />);
});

it('fetches player when in player mode', () => {
  const fetchPlayerMock = jest.spyOn(playerSlice, 'fetchPlayer').mockReturnValue({ type: 'FAKE-ACTION' });
  const initialState = {
    player: { id: 'fake-id' },
    noise: { noisePlayerInitialized: true, isPlaying: false, volume: '-10' }
  };

  renderWithRedux(<App />, { initialState });

  expect(fetchPlayerMock).toHaveBeenCalledTimes(1);
  fetchPlayerMock.mockRestore();
});

it('fetches player when in remote mode', () => {
  const fetchPlayerMock = jest.spyOn(playerSlice, 'fetchPlayer').mockReturnValue({ type: 'FAKE-ACTION' });
  const initialState = {
    remote: { playerId: 'fake-id' },
    noise: { noisePlayerInitialized: true, isPlaying: false, volume: '-10' }
  };

  renderWithRedux(<App />, { initialState });

  expect(fetchPlayerMock).toHaveBeenCalledTimes(1);
  fetchPlayerMock.mockRestore();
});

it('initializes the noise player when in player mode', () => {
  const initNoisePlayerMock = jest.spyOn(noiseSlice, 'initNoisePlayer').mockReturnValue({ type: 'FAKE-ACTION' });
  const initialState = { player: { id: 'fake-id', fetched: true } };

  renderWithRedux(<App />, { initialState });

  expect(initNoisePlayerMock).toHaveBeenCalledTimes(1);
  initNoisePlayerMock.mockRestore();
});

it('initializes the noise player when in player mode', () => {
  const initNoisePlayerMock = jest.spyOn(noiseSlice, 'initNoisePlayer').mockReturnValue({ type: 'FAKE-ACTION' });
  const initialState = { remote: { playerId: 'fake-id' }, player: { fetched: true } };

  renderWithRedux(<App />, { initialState });

  expect(initNoisePlayerMock).toHaveBeenCalledTimes(1);
  initNoisePlayerMock.mockRestore();
});
