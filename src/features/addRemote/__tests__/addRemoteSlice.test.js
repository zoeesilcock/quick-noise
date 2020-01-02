import { getDefaultMiddleware } from 'redux-starter-kit';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import addRemoteReducer, { setIsFetching, setRemoteCode, hideCode, addRemote } from '../addRemoteSlice';

const mockStore = configureStore(getDefaultMiddleware());
const mockRequest = new MockAdapter(axios);

it('should return the initial state', () => {
  const initialState = { newRemoteCode: null, fetchingCode: false, showingCode: false };
  expect(addRemoteReducer(undefined, {})).toEqual(initialState);
});

it('should update the state when the setIsFetching action is triggered', () => {
  expect(addRemoteReducer({ fetchingCode: false }, setIsFetching(true)))
    .toEqual({ fetchingCode: true });
  expect(addRemoteReducer({ fetchingCode: true }, setIsFetching(false)))
    .toEqual({ fetchingCode: false });
});

it('should update the state when the setRemoteCode action is triggered', () => {
  const newCode = 420;

  expect(addRemoteReducer(null, setRemoteCode(newCode)))
    .toEqual({ newRemoteCode: newCode, fetchingCode: false, showingCode: true });
});

it('should update the state when the hideCode action is triggered', () => {
  expect(addRemoteReducer({ showingCode: true }, hideCode()))
    .toEqual({ showingCode: false });
});

it('should fetch code from API when the addRemote action is triggered', async () => {
  const playerId = 'fake-player-id';
  const store = mockStore({
    player: {
      id: playerId,
      data: { id: playerId },
    }
  });
  const code = 1337;
  const expectedActions = [
    { payload: true, type: 'addRemote/setIsFetching' },
    { payload: code, type: 'addRemote/setRemoteCode' },
  ];

  mockRequest.onGet(`/api/player/${playerId}/remotecode`).reply(200, { remote_code: code });

  await store.dispatch(addRemote());
  const actions = store.getActions();

  expect(actions).toEqual(expectedActions);
});

it('should create player and fetch code from API when the addRemote action is triggered', async () => {
  const playerId = 'fake-player-id';
  const store = mockStore({
    player: {
      id: playerId,
    }
  });
  const code = 1337;
  const expectedActions = [
    { payload: true, type: 'addRemote/setIsFetching' },
    { payload: { playerId }, type: 'player/setPlayer' },
    { payload: code, type: 'addRemote/setRemoteCode' },
  ];

  mockRequest.onPost('/api/player').reply(200, { player: { playerId } });
  mockRequest.onGet(`/api/player/${playerId}/remotecode`).reply(200, { remote_code: code });

  await store.dispatch(addRemote());
  const actions = store.getActions();

  expect(actions).toEqual(expectedActions);
});
