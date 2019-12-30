import axios from 'axios';

import { createSlice } from 'redux-starter-kit';

const playerSlice = createSlice({
  name: 'player',
  initialState: null,
  reducers: {
    setPlayer(state, action) {
      return Object.assign({}, state, { id: action.payload.id, data: action.payload });
    },
    setFetched(state, action) {
      return Object.assign({}, state, { fetched: action.payload });
    }
  }
});

export const { setFetched } = playerSlice.actions;

export function fetchPlayer(playerId) {
  return (dispatch, getState) => {
    return axios.get(`/api/player/${playerId}`).then(res => {
      dispatch(playerSlice.actions.setPlayer(res.data.player));
      dispatch(setFetched(true));
    });
  };
}

export function createPlayer() {
  return (dispatch, getState) => {
    return axios.post('/api/player').then(res => {
      dispatch(playerSlice.actions.setPlayer(res.data.player));
    });
  };
}

export default playerSlice.reducer;
