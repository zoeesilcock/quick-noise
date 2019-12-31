import { connect } from 'react-redux';
import { setMode } from './appModeSlice';
import AppModeToggle from './AppModeToggle';

const mapStateToProps = state => ({
  appMode: state.appMode,
});

const mapDispatchToProps = { setMode };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppModeToggle);
