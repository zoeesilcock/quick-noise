import React from 'react';
import PropTypes from 'prop-types';

import './NoiseToggle.css'

class NoiseToggle extends React.Component {
  handleClick = () => {
    this.props.toggleNoise();
  }

  render() {
    const buttonClass = 'NoiseToggle-button' + (this.props.isPlaying ? ' NoiseToggle-playing' : '');

    return (
      <button
        className={buttonClass}
        onClick={this.handleClick}
        disabled={!this.props.allowsPlaying}
      >
        Toggle noise
      </button>
    );
  }
}

NoiseToggle.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  allowsPlaying: PropTypes.bool.isRequired,
  toggleNoise: PropTypes.func.isRequired,
}

export default NoiseToggle;
