import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { faTimes, faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './App.css';
import { fetchPlayer } from '../features/player/playerSlice';

import HomePage from '../pages/HomePage';
import SettingsPage from '../pages/SettingsPage';

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
