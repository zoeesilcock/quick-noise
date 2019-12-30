import { connect } from 'react-redux';
import { addRemote } from './addRemoteSlice';
import AddRemoteButton from './AddRemoteButton';

const mapStateToProps = state => ({
  isFetching: state.addRemote.fetchingCode,
});

const mapDispatchToProps = { addRemote };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRemoteButton);
