import axios from 'axios';

import { createSlice } from 'redux-starter-kit';
import { setNoiseVolume } from '../noise/noiseSlice';

const playerSlice = createSlice({
  name: 'player',
  initialState: null,
  reducers: {
    setPlayer(state, action) {
      return Object.assign({}, state, {
        id: action.payload ? action.payload.id : null,
        data: action.payload
      });
    },
    setFetched(state, action) {
      return Object.assign({}, state, { fetched: action.payload });
    }
  }
});

export const { setFetched } = playerSlice.actions;

export function fetchPlayer(playerId) {
  return (dispatch) => {
    return axios.get(`/api/player/${playerId}`).then(res => {
      dispatch(playerSlice.actions.setPlayer(res.data.player));
      dispatch(setFetched(true));
      dispatch(setNoiseVolume(res.data.player.volume));
    });
  };
}

export function createPlayer() {
  return (dispatch) => {
    return axios.post('/api/player').then(res => {
      dispatch(playerSlice.actions.setPlayer(res.data.player));
    });
  };
}

export default playerSlice.reducer;
