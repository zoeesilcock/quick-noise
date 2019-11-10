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
      const newAppMode = state === AppModes.PLAYER ? AppModes.REMOTE : AppModes.PLAYER;
      return newAppMode;
    },
  }
});

export const { toggleMode } = appModeSlice.actions;

export default appModeSlice.reducer;
