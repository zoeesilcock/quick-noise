import io from 'socket.io-client';

import { store } from '../../store';
import { AppModes } from '../appMode/appModeSlice';
import { toggleNoise, setNoiseVolume, setVolume } from './noiseSlice';

const port = process.env.REACT_APP_API_PORT || 5000;

class NoiseSocket {
  constructor(playerId) {
    this.playerId = playerId;
    this.socket = io(`${window.location.hostname}:${port}?playerId=${playerId}`);

    this.socket.on('toggle noise', () => {
      const { appMode } = store.getState();

      if (appMode === AppModes.PLAYER) {
        store.dispatch(toggleNoise());
      }
    });

    this.socket.on('set volume', (volume) => {
      const { appMode } = store.getState();

      if (appMode === AppModes.PLAYER) {
        // Set the volume state and the noise player volume.
        store.dispatch(setNoiseVolume(volume));
      } else {
        // Only set the volume state so it matches the player.
        store.dispatch(setVolume(volume));
      }
    });
  }
}

export default NoiseSocket;
