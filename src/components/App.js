import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';

import './App.css';
import { fetchPlayer } from '../features/player/playerSlice';

import AppModeContainer from '../features/appMode/AppModeContainer';
import NoiseToggleContainer from '../features/noise/NoiseToggleContainer';
import AddRemoteContainer from '../features/addRemote/AddRemoteContainer';
import RemoteContainer from '../features/remote/RemoteContainer';

Modal.setAppElement('#root');

const App = () => {
  const dispatch = useDispatch();
  const player = useSelector((state) => state.player);

  useEffect(() => {
    if (player && player.id && !player.fetched) {
      dispatch(fetchPlayer(player.id));
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Quick Noise</h1>
        <NoiseToggleContainer />
        <br />
        <AppModeContainer />
        <br />
        <AddRemoteContainer />
        <RemoteContainer />
      </header>
    </div>
  );
}

export default App;
