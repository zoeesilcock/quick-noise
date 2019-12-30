import React from 'react';
import { connect } from 'react-redux';

import { addRemote, hideCode } from './addRemoteSlice';
import AddRemoteButton from './AddRemoteButton';
import AddRemoteCode from './AddRemoteCode';
import { AppModes } from '../appMode/appModeSlice';

const mapStateToProps = state => ({
  isFetching: state.addRemote.fetchingCode,
  newRemoteCode: state.addRemote.newRemoteCode,
  isShowingCode: state.addRemote.showingCode,
  appMode: state.appMode,
});

const mapDispatchToProps = { addRemote, hideCode };

class AddRemoteContainer extends React.Component {
  render() {
    let jsx = null;

    if (this.props.appMode === AppModes.PLAYER) {
      jsx = (
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

    return jsx;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRemoteContainer);
