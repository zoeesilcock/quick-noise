import { connect } from 'react-redux';
import { toggleMode } from './appModeSlice';
import AppModeToggle from './AppModeToggle';

const mapStateToProps = state => ({
  appMode: state.appMode,
});

const mapDispatchToProps = { toggleMode };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppModeToggle);
