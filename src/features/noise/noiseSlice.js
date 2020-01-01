import { createSlice } from 'redux-starter-kit';

import NoisePlayer from './NoisePlayer';

let noisePlayer = null;

const noiseSlice = createSlice({
  name: 'noise',
  initialState: { noisePlayerInitialized: false, isPlaying: false },
  reducers: {
    initNoisePlayer(state, action) {
      noisePlayer = new NoisePlayer(action.payload);
      return Object.assign({}, state, { noisePlayerInitialized: true });
    },
    setIsPlaying(state, action) {
      return Object.assign({}, state, { isPlaying: action.payload });
    },
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

export const { initNoisePlayer, setIsPlaying } = noiseSlice.actions;

export default noiseSlice.reducer;
