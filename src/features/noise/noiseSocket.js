import io from 'socket.io-client';

import { store } from '../../store';
import { AppModes } from '../appMode/appModeSlice';
import { toggleNoise } from './noiseSlice';

const port = process.env.REACT_APP_API_PORT || 5000;
const socket = io(`${window.location.hostname}:${port}`);

socket.on('toggle noise', (playerId) => {
  const { appMode, player } = store.getState();

  if (appMode === AppModes.PLAYER && player && player.id === playerId) {
    store.dispatch(toggleNoise());
  }
});

export default socket;
