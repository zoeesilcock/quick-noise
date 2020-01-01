import io from 'socket.io-client';

import { store } from '../../store';
import { AppModes } from '../appMode/appModeSlice';
import { toggleNoise } from './noiseSlice';

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
  }
}

export default NoiseSocket;
