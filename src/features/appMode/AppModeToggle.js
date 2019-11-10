import React from 'react';
import PropTypes from 'prop-types';

import './AppModeToggle.css'
import { AppModes } from './appModeSlice'

class AppModeToggle extends React.Component {
  handleClick = () => {
    this.props.toggleMode();
  }

  render() {
    return (
      <div className="AppModeToggle-body" onClick={this.handleClick}>
        <span className={this.props.appMode === AppModes.PLAYER ? 'AppModeToggle-selected' : ''}>
          Player
        </span>
        <div className={this.props.appMode === AppModes.PLAYER ? 'AppModeToggle-player' : 'AppModeToggle-remote'}>
          <div className="AppModeToggle-box"></div>
        </div>
        <span className={this.props.appMode === AppModes.REMOTE ? 'AppModeToggle-selected' : ''}>
          Remote
        </span>
      </div>
    );
  }
}

AppModeToggle.propTypes = {
  appMode: PropTypes.string.isRequired,
  toggleMode: PropTypes.func.isRequired,
}

export default AppModeToggle;
