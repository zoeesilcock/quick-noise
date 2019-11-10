import { connect } from 'react-redux';
import { toggleNoise } from './noiseSlice';
import NoiseToggle from './NoiseToggle';

const mapStateToProps = state => ({
  isPlaying: state.noise.isPlaying,
});

const mapDispatchToProps = { toggleNoise };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoiseToggle);
