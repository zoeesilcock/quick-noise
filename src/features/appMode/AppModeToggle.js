import React from 'react';
import PropTypes from 'prop-types';

import './AppModeToggle.css'
import { AppModes } from './appModeSlice'

class AppModeToggle extends React.Component {
  handlePlayerChange = () => {
    this.props.setMode(AppModes.PLAYER);
  }

  handleRemoteChange = () => {
    this.props.setMode(AppModes.REMOTE);
  }

  render() {
    return (
      <div className="AppModeToggle-body">
        <div>
          <input
            className="AppModeToggle-radio"
            type="radio"
            name="appMode"
            value="player"
            id="appModePlayer"
            onChange={this.handlePlayerChange}
            checked={this.props.appMode === AppModes.PLAYER}
          />
          <label htmlFor="appModePlayer">Player</label>
          <p className="AppModeToggle-description">
            Use this option on the device that will be playing the noise.
          </p>
        </div>
        <br />
        <div>
          <input
            className="AppModeToggle-radio"
            type="radio"
            name="appMode"
            value="remote"
            id="appModeRemote"
            onChange={this.handleRemoteChange}
            checked={this.props.appMode === AppModes.REMOTE}
          />
          <label htmlFor="appModeRemote">Remote</label>
          <p className="AppModeToggle-description">
            Use this option on any device you want to remote controll the player from.
          </p>
        </div>
      </div>
    );
  }
}

AppModeToggle.propTypes = {
  appMode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
}

export default AppModeToggle;
