import React from 'react';
import { connect } from 'react-redux';
import { toggleNoise, setNoiseVolume } from './noiseSlice';
import NoiseToggle from './NoiseToggle';
import NoiseVolume from './NoiseVolume';
import { AppModes } from '../appMode/appModeSlice';

const mapStateToProps = state => ({
  isPlaying: state.noise.isPlaying,
  allowsPlaying: state.appMode === AppModes.PLAYER || state.remote.playerId !== null,
  volume: state.noise.volume,
});

const mapDispatchToProps = { toggleNoise, setNoiseVolume };

class NoiseContainer extends React.Component {
  render() {
    return (
      <div>
        <NoiseToggle
          isPlaying={this.props.isPlaying}
          allowsPlaying={this.props.allowsPlaying}
          toggleNoise={this.props.toggleNoise}
        />
        <NoiseVolume
          volume={this.props.volume}
          setVolume={this.props.setNoiseVolume}
        />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoiseContainer);
