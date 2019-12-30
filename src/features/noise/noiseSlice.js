import { createSlice } from 'redux-starter-kit';

import noisePlayer from './noisePlayer';

const noiseSlice = createSlice({
  name: 'noise',
  initialState: { isPlaying: false },
  reducers: {
    setIsPlaying(state, action) {
      return Object.assign({}, state, { isPlaying: action.payload });
    },
  }
});

export const toggleNoise = () => {
  return (dispatch, getState) => {
    const { appMode, noise, remote } = getState();

    noisePlayer.toggleNoise(noise.isPlaying, appMode, remote.playerId);
    dispatch(setIsPlaying(!noise.isPlaying));
  }
};

export const { setIsPlaying } = noiseSlice.actions;

export default noiseSlice.reducer;
