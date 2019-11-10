import Tone from 'tone';

import { AppModes } from '../appMode/appModeSlice';
import noiseSocket from './noiseSocket';

class NoisePlayer {
  // Must be called from a user event.
  initNoise() {
    this.noise = new Tone.Noise("brown").toMaster();
    this.noise._playbackRate = 0.1;
  }

  toggleNoise(isPlaying, appMode) {
    if (appMode === AppModes.PLAYER) {
      this.togglePlayer(isPlaying);
    } else {
      this.toggleRemote();
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

  toggleRemote() {
    noiseSocket.emit('toggle noise');
  }
}

const noisePlayer = new NoisePlayer();

export default noisePlayer;
