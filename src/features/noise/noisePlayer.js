import Tone from 'tone';

import { AppModes } from '../appMode/appModeSlice';
import NoiseSocket from './NoiseSocket';

export default class NoisePlayer {
  constructor(playerId, volume) {
    this.initNoiseSocket(playerId);
    this.setPlayerVolume(volume);
  }

  // Must be called from a user event.
  initNoise() {
    if (!this.noise) {
      this.noise = new Tone.Noise('brown').toMaster();
      this.noise._playbackRate = 0.1;
    }
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
      this.toggleRemote(playerId, isPlaying);
    }
  }

  togglePlayer(isPlaying) {
    this.initNoise();

    if (isPlaying) {
      this.noise.stop();
    } else {
      this.noise.start();
    }
  }

  toggleRemote(playerId, isPlaying) {
    this.initNoiseSocket(playerId);

    this.noiseSocket.socket.emit('toggle noise', isPlaying);
  }

  setVolume(volume, appMode, playerId) {
    if (appMode === AppModes.PLAYER) {
      this.setPlayerVolume(volume);
    }

    this.setRemoteVolume(volume, playerId);
  }

  setPlayerVolume(volume) {
    this.initNoise();

    this.noise.volume.value = volume;
  }

  setRemoteVolume(volume, playerId) {
    this.initNoiseSocket(playerId);

    this.noiseSocket.socket.emit('set volume', volume);
  }
}
