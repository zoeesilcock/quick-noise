import axios from 'axios';
import { createSlice } from 'redux-starter-kit';

const addRemoteSlice = createSlice({
  name: 'remote',
  initialState: { playerId: null, showingConnect: false },
  reducers: {
    setPlayerId(state, action) {
      return Object.assign({}, state, { playerId: action.payload });
    },
    setConnectShow(state, action) {
      return Object.assign({}, state, { showingConnect: action.payload });
    }
  }
});

export const { setPlayerId, setConnectShow } = addRemoteSlice.actions;

export function showConnect() {
  return addRemoteSlice.actions.setConnectShow(true);
}

export function connectRemote(code) {
  return (dispatch) => {
    return axios.get(`/api/player/connect/${code}`).then(res => {
      dispatch(setPlayerId(res.data.playerId));
      return dispatch(addRemoteSlice.actions.setConnectShow(false));
    });
  };
}

export default addRemoteSlice.reducer;
