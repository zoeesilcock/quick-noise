import React from 'react';
import { connect } from 'react-redux';

import { setConnectShow, connectRemote } from './remoteSlice';
import RemoteConnectButton from './RemoteConnectButton';
import RemoteConnectModal from './RemoteConnectModal';
import { AppModes } from '../appMode/appModeSlice';

const mapStateToProps = state => ({
  showingConnect: state.remote.showingConnect,
  playerConnected: !!state.remote.playerId,
  appMode: state.appMode,
});

const mapDispatchToProps = { setConnectShow, connectRemote };

class RemoteContainer extends React.Component {
  render() {
    let jsx = null;

    if (this.props.appMode === AppModes.REMOTE && !this.props.playerConnected) {
      jsx = (
        <div>
          <RemoteConnectButton
            setConnectShow={this.props.setConnectShow}
          />
          <RemoteConnectModal
            showingConnect={this.props.showingConnect}
            connectRemote={this.props.connectRemote}
            setConnectShow={this.props.setConnectShow}
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
)(RemoteContainer);
