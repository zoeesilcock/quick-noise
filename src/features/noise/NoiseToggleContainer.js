import { connect } from 'react-redux';
import { toggleNoise } from './noiseSlice';
import NoiseToggle from './NoiseToggle';
import { AppModes } from '../appMode/appModeSlice';

const mapStateToProps = state => ({
  isPlaying: state.noise.isPlaying,
  allowsPlaying: state.appMode === AppModes.PLAYER || state.remote.playerId !== null,
});

const mapDispatchToProps = { toggleNoise };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoiseToggle);
