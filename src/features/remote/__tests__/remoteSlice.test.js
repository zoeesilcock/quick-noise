import { getDefaultMiddleware } from 'redux-starter-kit';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import remoteReducer, { setPlayerId, setConnectShow, showConnect, connectRemote } from '../remoteSlice';

const mockStore = configureStore(getDefaultMiddleware());
const mockRequest = new MockAdapter(axios);

it('should return the initial state', () => {
  const initialState = { playerId: null, showingConnect: false };
  expect(remoteReducer(undefined, {})).toEqual(initialState);
});

it('should update the state when the setPlayerId action is triggered', () => {
  const playerId = 'fake-player-id';

  expect(remoteReducer({ playerId: null }, setPlayerId(playerId)))
    .toEqual({ playerId: playerId });
});

it('should update the state when the setConnectShow action is triggered', () => {
  expect(remoteReducer({ showingConnect: false }, setConnectShow(true)))
    .toEqual({ showingConnect: true });
  expect(remoteReducer({ showingConnect: true }, setConnectShow(false)))
    .toEqual({ showingConnect: false });
});

it('should update the state when the showConnect action is triggered', () => {
  expect(remoteReducer({ showingConnect: false }, showConnect()))
    .toEqual({ showingConnect: true });
});

it('should fetch playerId from API when the connectRemote action is triggered', async () => {
  const store = mockStore({});
  const playerId = 'fake-player-id';
  const code = { id: playerId };
  const expectedActions = [
    { payload: playerId, type: 'remote/setPlayerId' },
    { payload: false, type: 'remote/setConnectShow' },
  ];

  mockRequest.onGet(`/api/player/connect/${code}`).reply(200, { playerId });

  await store.dispatch(connectRemote(code));
  const actions = store.getActions();

  expect(actions).toEqual(expectedActions);
});
