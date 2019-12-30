import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.css';
import { fetchPlayer } from '../features/player/playerSlice';

import AppModeContainer from '../features/appMode/AppModeContainer';
import NoiseToggleContainer from '../features/noise/NoiseToggleContainer';
import AddRemoteContainer from '../features/addRemote/AddRemoteContainer';

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
        <br/>
        <AppModeContainer />
        <AddRemoteContainer />
      </header>
    </div>
  );
}

export default App;
