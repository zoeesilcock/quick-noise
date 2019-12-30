import Tone from 'tone';

import { AppModes } from '../appMode/appModeSlice';
import noiseSocket from './noiseSocket';

class NoisePlayer {
  // Must be called from a user event.
  initNoise() {
    this.noise = new Tone.Noise('brown').toMaster();
    this.noise._playbackRate = 0.1;
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
    noiseSocket.emit('toggle noise', playerId);
  }
}

const noisePlayer = new NoisePlayer();

export default noisePlayer;
