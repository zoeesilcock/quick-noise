import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { faTimes, faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './App.css';
import { fetchPlayer, createPlayer } from '../features/player/playerSlice';
import { initNoisePlayer, toggleNoise } from '../features/noise/noiseSlice';
import { AppModes } from '../features/appMode/appModeSlice';

import HomePage from '../pages/HomePage';
import SettingsPage from '../pages/SettingsPage';

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');

const App = () => {
  const dispatch = useDispatch();
  const player = useSelector((state) => state.player);
  const remote = useSelector((state) => state.remote);
  const noisePlayerInitialized = useSelector((state) => state.noise.noisePlayerInitialized);
  const appMode = useSelector((state) => state.appMode);
  const autoToggle = useSelector((state) => state.autoToggle);

  useEffect(() => {
    if (player && player.id && appMode === AppModes.PLAYER && !player.fetching && !player.fetched) {
      // Fetch own player.
      dispatch(fetchPlayer(player.id));
    } else if ((!player || !player.id) && appMode === AppModes.PLAYER) {
      console.log('Create player');
      dispatch(createPlayer());
    }

    if (remote && remote.playerId && appMode === AppModes.REMOTE && (!player || (!player.fetching && !player.fetched))) {
      // Fetch player used by remote.
      dispatch(fetchPlayer(remote.playerId));
    }

    if (player && player.id && appMode === AppModes.PLAYER && !noisePlayerInitialized) {
      // Initialize noise player based on player.
      dispatch(initNoisePlayer(player.id));
    } else if (remote && remote.playerId && appMode === AppModes.REMOTE && !noisePlayerInitialized) {
      // Initialize noise player based on remote.
      dispatch(initNoisePlayer(remote.playerId));

      if (autoToggle) {
        dispatch(toggleNoise());
      }
    }
  });

  return (
    <Router>
      <div className="App">
        <div className="App-container">
          <nav className="App-nav">
            <Switch>
              <Route path="/settings">
                <Link to="/"><FontAwesomeIcon icon={faTimes} /></Link>
              </Route>
              <Route path="/">
                <Link to="/settings"><FontAwesomeIcon icon={faCog} /></Link>
              </Route>
            </Switch>
          </nav>

          <Switch>
            <Route path="/settings">
              <SettingsPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
