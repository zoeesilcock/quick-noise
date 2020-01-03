import NoiseSocket from '../NoiseSocket';
import { AppModes } from '../../appMode/appModeSlice';

import socketClient, { serverSocket, socketCleanup } from '../../../__mocks__/socket.io-client';
import * as store from '../../../store';

const dispatchMock = jest.spyOn(store.store, 'dispatch').mockReturnValue(null);
const getStateMock = jest.spyOn(store.store, 'getState');

const playerId = 'fake-player-id';
let noiseSocket = null;

beforeEach(() => {
  noiseSocket = new NoiseSocket(playerId);
  expect(socketClient).toHaveBeenCalledTimes(1);
  dispatchMock.mockClear();
});

afterEach(() => {
  socketClient.mockClear();
  dispatchMock.mockClear();
  getStateMock.mockClear();
  socketCleanup();
});

it('dispatches toggleNoise when "toggle noise" event is received when in PLAYER mode', () => {
  getStateMock.mockReturnValue({ appMode: AppModes.PLAYER });

  serverSocket.emit('toggle noise');

  expect(getStateMock).toHaveBeenCalledTimes(1);
  expect(dispatchMock).toHaveBeenCalledTimes(1);
});

it('does not dispatches toggleNoise when "toggle noise" event is received when in REMOTE mode', () => {
  getStateMock.mockReturnValue({ appMode: AppModes.REMOTE });

  serverSocket.emit('toggle noise');

  expect(getStateMock).toHaveBeenCalledTimes(1);
  expect(dispatchMock).toHaveBeenCalledTimes(0);
});

it('dispatches setNoiseVolume when "set volume" event is received when in PLAYER mode', () => {
  const volume = '-9';
  getStateMock.mockReturnValue({ appMode: AppModes.PLAYER });

  serverSocket.emit('set volume', volume);

  expect(getStateMock).toHaveBeenCalledTimes(1);
  expect(dispatchMock).toHaveBeenCalledTimes(1);
});

it('dispatches setVolume when "set volume" event is received when in REMOTE mode', () => {
  const volume = '-9';
  getStateMock.mockReturnValue({ appMode: AppModes.REMOTE });

  serverSocket.emit('set volume', volume);

  expect(getStateMock).toHaveBeenCalledTimes(1);
  expect(dispatchMock).toHaveBeenCalledTimes(1);
});
