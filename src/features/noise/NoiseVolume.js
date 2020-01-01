import React from 'react';
import PropTypes from 'prop-types';

import './NoiseVolume.css'

class NoiseVolume extends React.Component {
  handleChange = (event) => {
    this.props.setVolume(event.target.value);
  }

  render() {
    return (
      <div>
        <input
          className="NoiseVolume-slider"
          type="range"
          min="-30"
          max="0"
          value={this.props.volume}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

NoiseVolume.propTypes = {
  volume: PropTypes.string.isRequired,
  setVolume: PropTypes.func.isRequired,
}

export default NoiseVolume;
