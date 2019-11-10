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
      <div>
        <button className={buttonClass} onClick={this.handleClick}>
          Toggle noise
        </button>
      </div>
    );
  }
}

NoiseToggle.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  toggleNoise: PropTypes.func.isRequired,
}

export default NoiseToggle;
