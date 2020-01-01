import Tone from 'tone';

import { AppModes } from '../appMode/appModeSlice';
import NoiseSocket from './NoiseSocket';

class NoisePlayer {
  constructor(playerId) {
    this.initNoiseSocket(playerId);
  }

  // Must be called from a user event.
  initNoise() {
    this.noise = new Tone.Noise('brown').toMaster();
    this.noise._playbackRate = 0.1;
  }

  initNoiseSocket(playerId) {
    if (!this.noiseSocket) {
      this.noiseSocket = new NoiseSocket(playerId);
    }
  }

  toggleNoise(isPlaying, appMode, playerId) {
    if (appMode === AppModes.PLAYER) {
      this.togglePlayer(isPlaying);
    } else {
      this.toggleRemote(playerId);
    }
  }

  togglePlayer(isPlaying) {
    if (!this.noise) {
      this.initNoise();
    }

    if (isPlaying) {
      this.noise.stop();
    } else {
      this.noise.start();
    }
  }

  toggleRemote(playerId) {
    this.initNoiseSocket(playerId);
    this.noiseSocket.socket.emit('toggle noise');
  }
}

export default NoisePlayer;
