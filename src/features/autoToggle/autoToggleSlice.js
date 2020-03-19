import { createSlice } from 'redux-starter-kit';

const autoToggleSlice = createSlice({
  name: 'autoToggle',
  initialState: false,
  reducers: {
    setAutoToggle(state, action) {
      return action.payload;
    },
  }
});

export const { setAutoToggle } = autoToggleSlice.actions;

export default autoToggleSlice.reducer;
