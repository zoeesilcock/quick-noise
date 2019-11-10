import { createSlice } from 'redux-starter-kit';

export const AppModes = {
  REMOTE: 'REMOTE',
  PLAYER: 'PLAYER',
};

const appModeSlice = createSlice({
  name: 'appMode',
  initialState: AppModes.REMOTE,
  reducers: {
    toggleMode(state) {
      return state === AppModes.PLAYER ? AppModes.REMOTE : AppModes.PLAYER;
    },
  }
});

export const { toggleMode } = appModeSlice.actions;

export default appModeSlice.reducer;
