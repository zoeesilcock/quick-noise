import NoisePlayer from '../NoisePlayer';
import { AppModes } from '../../appMode/appModeSlice';

import { socketEmit } from '../../../__mocks__/socket.io-client';
import { NoiseConstructor, volumeSetter, noiseStart, noiseStop } from '../../../__mocks__/tone';

const playerId = 'fake-player-id';
const volume = 'fake-volume';
let player = null;

beforeEach(() => {
  player = new NoisePlayer(playerId, volume);
  expect(NoiseConstructor).toHaveBeenCalledTimes(1);
  expect(volumeSetter).toHaveBeenCalledTimes(1);

  volumeSetter.mockClear();
});

afterEach(() => {
  NoiseConstructor.mockClear();
  volumeSetter.mockClear();
  socketEmit.mockClear();
});

it('toggles the noise on the player when in player mode', () => {
  const appMode = AppModes.PLAYER;
  let isPlaying = false;

  player.toggleNoise(isPlaying, appMode, playerId);
  expect(noiseStart).toHaveBeenCalledTimes(1);

  isPlaying = true;
  player.toggleNoise(isPlaying, appMode, playerId);
  expect(noiseStop).toHaveBeenCalledTimes(1);
});

it('toggles the socket when in remote mode', () => {
  const appMode = AppModes.REMOTE;
  let isPlaying = false;

  player.toggleNoise(isPlaying, appMode, playerId);
  expect(socketEmit).toHaveBeenCalledTimes(1);
  expect(socketEmit).toHaveBeenCalledWith('toggle noise');
});

it('sets the volume locally in player mode', () => {
  const appMode = AppModes.PLAYER;

  player.setVolume(volume, appMode, playerId);
  expect(volumeSetter).toHaveBeenCalledTimes(1);
  expect(volumeSetter).toHaveBeenCalledWith(volume);
});

it('sets the volume remotely in remote mode', () => {
  const appMode = AppModes.REMOTE;

  player.setVolume(volume, appMode, playerId);
  expect(socketEmit).toHaveBeenCalledTimes(1);
  expect(socketEmit).toHaveBeenCalledWith('set volume', volume);
});
