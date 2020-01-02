import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { faTimes, faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './App.css';
import { fetchPlayer } from '../features/player/playerSlice';
import { initNoisePlayer } from '../features/noise/noiseSlice';

import HomePage from '../pages/HomePage';
import SettingsPage from '../pages/SettingsPage';

if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#root');
}

const App = () => {
  const dispatch = useDispatch();
  const player = useSelector((state) => state.player);
  const remote = useSelector((state) => state.remote);
  const noisePlayerInitialized = useSelector((state) => state.noise.noisePlayerInitialized);

  useEffect(() => {
    // Fetch own player.
    if (player && player.id && !player.fetching && !player.fetched) {
      dispatch(fetchPlayer(player.id));
    }

    // Fetch player used by remote.
    if (remote && remote.playerId && !player.fetching && !player.fetched) {
      dispatch(fetchPlayer(remote.playerId));
    }

    // Initialize noise player based on player.
    if (player && player.id && !noisePlayerInitialized) {
      dispatch(initNoisePlayer(player.id));
    }

    // Initialize noise player based on remote.
    if (remote && remote.playerId && !noisePlayerInitialized) {
      dispatch(initNoisePlayer(remote.playerId));
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
