import React from 'react';
import { connect } from 'react-redux';

import { addRemote, hideCode } from './addRemoteSlice';
import AddRemoteButton from './AddRemoteButton';
import AddRemoteCode from './AddRemoteCode';

const mapStateToProps = state => ({
  isFetching: state.addRemote.fetchingCode,
  newRemoteCode: state.addRemote.newRemoteCode,
  isShowingCode: state.addRemote.showingCode,
});

const mapDispatchToProps = { addRemote, hideCode };

class AddRemoteContainer extends React.Component {
  render() {
    return (
      <div>
        <AddRemoteButton
          isFetching={this.props.isFetching}
          addRemote={this.props.addRemote}
        />
        <AddRemoteCode
          newRemoteCode={this.props.newRemoteCode}
          isShowingCode={this.props.isShowingCode}
          hideCode={this.props.hideCode}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRemoteContainer);
