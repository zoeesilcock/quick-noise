import { getDefaultMiddleware } from 'redux-starter-kit';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import playerReducer, { setPlayer, setFetching, setFetched, fetchPlayer, createPlayer } from '../playerSlice';

const mockStore = configureStore(getDefaultMiddleware());
const mockRequest = new MockAdapter(axios);

it('should return the initial state', () => {
  const initialState = null;
  expect(playerReducer(undefined, {})).toEqual(initialState);
});

it('should update the state when the setPlayer action is triggered', () => {
  const player = {
    id: 'fake-player-id',
  };

  expect(playerReducer(null, setPlayer(player)))
    .toEqual({ id: player.id, data: player });

  expect(playerReducer(null, setPlayer(false)))
    .toEqual({ id: null, data: null });
});

it('should update the state when the setFetched action is triggered', () => {
  expect(playerReducer({ fetched: false }, setFetched(true)))
    .toEqual({ fetched: true });
  expect(playerReducer({ fetched: true }, setFetched(false)))
    .toEqual({ fetched: false });
});

it('should update the state when the setFetching action is triggered', () => {
  expect(playerReducer({ fetching: false }, setFetching(true)))
    .toEqual({ fetching: true });
  expect(playerReducer({ fetching: true }, setFetching(false)))
    .toEqual({ fetching: false });
});

it('should fetch player from API when the fetchPlayer action is triggered', async () => {
  const store = mockStore({});
  const playerId = 'fake-player-id';
  const player = { id: playerId };
  const expectedActions = [
    { payload: true, type: 'player/setFetching' },
    { payload: player, type: 'player/setPlayer' },
    { payload: true, type: 'player/setFetched' },
    { payload: false, type: 'player/setFetching' },
  ];

  mockRequest.onGet(`/api/player/${playerId}`).reply(200, { player });

  await store.dispatch(fetchPlayer(playerId));
  const actions = store.getActions();

  expect(actions).toEqual(expectedActions);
});

it('should handle empty response when fetchPlayer action is triggered', async () => {
  const store = mockStore({});
  const playerId = 'fake-player-id';
  const expectedActions = [
    { payload: true, type: 'player/setFetching' },
    { payload: null, type: 'player/setPlayer' },
    { payload: true, type: 'player/setFetched' },
    { payload: false, type: 'player/setFetching' },
  ];

  mockRequest.onGet(`/api/player/${playerId}`).reply(200, { player: null });

  await store.dispatch(fetchPlayer(playerId));
  const actions = store.getActions();

  expect(actions).toEqual(expectedActions);
});

it('should post a request to the API when the createPlayer action is triggered', async () => {
  const store = mockStore({});
  const playerId = 'fake-player-id';
  const player = { id: playerId };
  const expectedActions = [
    { payload: player, type: 'player/setPlayer' },
  ];

  mockRequest.onPost('/api/player').reply(200, { player });

  await store.dispatch(createPlayer());
  const actions = store.getActions();

  expect(actions).toEqual(expectedActions);
});
