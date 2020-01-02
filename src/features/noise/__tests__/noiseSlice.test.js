import { getDefaultMiddleware } from 'redux-starter-kit';
import configureStore from 'redux-mock-store';

import noiseReducer, { setIsPlaying, setVolume, initNoisePlayer, toggleNoise, setNoiseVolume } from '../noiseSlice';
import * as noisePlayer from '../NoisePlayer';

// Weird way of mocking our constructor because jest.mock wasn't working.
const mockToggleNoise = jest.fn();
const mockSetVolume = jest.fn();
noisePlayer.default = jest.fn().mockImplementation(() => {
  return {
    toggleNoise: mockToggleNoise,
    setVolume: mockSetVolume,
  };
});
const mockStore = configureStore(getDefaultMiddleware());

it('should return the initial state', () => {
  const initialState = { noisePlayerInitialized: false, isPlaying: false, volume: '-10' };
  expect(noiseReducer(undefined, {})).toEqual(initialState);
});

it('should set the state to whatever is sent to the setIsPlaying action', () => {
  const state = {
    noisePlayerInitialized: false,
    volume: '-9',
  };
  const playerId = 'fake-player-id';

  expect(noiseReducer(state, initNoisePlayer(playerId)))
    .toEqual(Object.assign({}, state, { noisePlayerInitialized: true }));

  expect(noisePlayer.default).toHaveBeenCalledTimes(1);
  expect(noisePlayer.default).toHaveBeenCalledWith(playerId, state.volume);
});

it('should set the state to whatever is sent to the setIsPlaying action', () => {
  expect(noiseReducer({ isPlaying: true }, setIsPlaying(false)))
    .toEqual({ isPlaying: false });
  expect(noiseReducer({ isPlaying: false }, setIsPlaying(true)))
    .toEqual({ isPlaying: true });
});

it('should update state when the setVolume action is triggered', () => {
  const newVolume = '-9';
  expect(noiseReducer({ volume: '-10' }, setVolume(newVolume)))
    .toEqual({ volume: newVolume });
});

it('dispatches setIsPlaying when the toggleNoise action is triggered', () => {
  const isPlaying = false;
  const newIsPlaying = true;
  const appMode = 'fake-mode';
  const playerId = 'fake-player-id';
  const store = mockStore({
    appMode,
    noise: { isPlaying },
    remote: { playerId },
  });
  const expectedActions = [{ payload: newIsPlaying, type: 'noise/setIsPlaying' }];

  store.dispatch(toggleNoise());
  const actions = store.getActions();

  expect(mockToggleNoise).toHaveBeenCalledTimes(1);
  expect(mockToggleNoise).toHaveBeenCalledWith(isPlaying, appMode, playerId);
  expect(actions).toEqual(expectedActions);
});

it('dispatches setVolume when the setNoiseVolume action is triggered', () => {
  const volume = '-9';
  const appMode = 'fake-mode';
  const playerId = 'fake-player-id';
  const store = mockStore({
    appMode,
    remote: { playerId },
  });
  const expectedActions = [{ payload: volume, type: 'noise/setVolume' }];

  store.dispatch(setNoiseVolume(volume));
  const actions = store.getActions();

  expect(mockSetVolume).toHaveBeenCalledTimes(1);
  expect(mockSetVolume).toHaveBeenCalledWith(volume, appMode, playerId);
  expect(actions).toEqual(expectedActions);
});
