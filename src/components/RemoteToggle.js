import React from 'react';
import PropTypes from 'prop-types';

import './RemoteToggle.css'

class RemoteToggle extends React.Component {
  render() {
    return (
      <div className="RemoteToggle-body" onClick={this.props.onClick}>
        <span className={this.props.isRemote ? '' : 'RemoteToggle-selected'}>Player</span>
        <div className={this.props.isRemote ? 'RemoteToggle-remote' : 'RemoteToggle-player'}>
          <div className="RemoteToggle-box"></div>
        </div>
        <span className={this.props.isRemote ? 'RemoteToggle-selected' : ''}>Remote</span>
      </div>
    );
  }
}

RemoteToggle.propTypes = {
  isRemote: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default RemoteToggle;
