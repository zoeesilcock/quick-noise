import axios from 'axios';
import { createSlice } from 'redux-starter-kit';

import { createPlayer } from '../player/playerSlice';

const addRemoteSlice = createSlice({
  name: 'addRemote',
  initialState: { newRemoteCode: null, fetchingCode: false },
  reducers: {
    setIsFetching(state, action) {
      return Object.assign({}, state, { fetchingCode: action.payload });
    },
    setRemoteCode(state, action) {
      return Object.assign({}, state, { newRemoteCode: action.payload, fetchingCode: false });
    },
  }
});

export const { setIsFetching, setRemoteCode } = addRemoteSlice.actions;

export function addRemote() {
  return (dispatch, getState) => {
    dispatch(addRemoteSlice.actions.setIsFetching(true));

    if (!getState().player.data) {
      dispatch(createPlayer());
    }

    return axios.get(`/api/player/${getState().player.id}/remotecode`).then(res => {
      dispatch(setRemoteCode(res.data.remote_code));
    });
  };
}

export default addRemoteSlice.reducer;
