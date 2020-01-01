import { createSlice } from 'redux-starter-kit';

import NoisePlayer from './NoisePlayer';

let noisePlayer = null;

const noiseSlice = createSlice({
  name: 'noise',
  initialState: { noisePlayerInitialized: false, isPlaying: false, volume: '-10' },
  reducers: {
    initNoisePlayer(state, action) {
      noisePlayer = new NoisePlayer(action.payload, state.volume);
      return Object.assign({}, state, { noisePlayerInitialized: true });
    },
    setIsPlaying(state, action) {
      return Object.assign({}, state, { isPlaying: action.payload });
    },
    setVolume(state, action) {
      return Object.assign({}, state, { volume: action.payload });
    }
  }
});

export const toggleNoise = () => {
  return (dispatch, getState) => {
    const { appMode, noise, remote } = getState();

    if (noisePlayer !== null) {
      noisePlayer.toggleNoise(noise.isPlaying, appMode, remote.playerId);
      dispatch(setIsPlaying(!noise.isPlaying));
    }
  }
};

export const setNoiseVolume = (volume) => {
  return (dispatch, getState) => {
    const { appMode, remote } = getState();

    if (noisePlayer !== null) {
      noisePlayer.setVolume(volume, appMode, remote.playerId);
      dispatch(setVolume(volume));
    }
  }
};

export const { initNoisePlayer, setIsPlaying, setVolume } = noiseSlice.actions;

export default noiseSlice.reducer;
