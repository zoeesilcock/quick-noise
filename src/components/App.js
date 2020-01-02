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

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');

const App = () => {
  const dispatch = useDispatch();
  const player = useSelector((state) => state.player);
  const remote = useSelector((state) => state.remote);
  const noisePlayerInitialized = useSelector((state) => state.noise.noisePlayerInitialized);

  useEffect(() => {
    if (player && player.id && !player.fetching && !player.fetched) {
      // Fetch own player.
      dispatch(fetchPlayer(player.id));
    }

    if (remote && remote.playerId && (!player || (!player.fetching && !player.fetched))) {
      // Fetch player used by remote.
      dispatch(fetchPlayer(remote.playerId));
    }

    if (player && player.id && !noisePlayerInitialized) {
      // Initialize noise player based on player.
      dispatch(initNoisePlayer(player.id));
    } else if (remote && remote.playerId && !noisePlayerInitialized) {
      // Initialize noise player based on remote.
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
