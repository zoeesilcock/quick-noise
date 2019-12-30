import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

class RemoteConnectModal extends React.Component {
  handleClose = () => {
    this.props.setConnectShow(false);
  }

  handleConnect = () => {
    this.props.connectRemote(this.state.code);
  }

  handleCodeChange = (event) => {
    this.setState({ code: event.target.value });
  }

  render() {
    let jsx = null;
    const modalStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };

    if (this.props.showingConnect) {
      jsx = (
        <Modal
          isOpen={this.props.showingConnect}
          onRequestClose={this.handleClose}
          contentLabel="Connect to player"
          style={modalStyles}
        >
          <h1>Connect to player</h1>
          <div>Please enter the code shown on the player device:</div>
          <br />
          <input type="text" size="8" onChange={this.handleCodeChange} />
          <br />
          <br />
          <button onClick={this.handleClose}>Close</button>{' '}
          <button onClick={this.handleConnect}>Connect</button>
        </Modal>
      );
    }

    return (jsx);
  }
}

RemoteConnectModal.propTypes = {
  showingConnect: PropTypes.bool.isRequired,
  setConnectShow: PropTypes.func.isRequired,
  connectRemote: PropTypes.func.isRequired,
}

export default RemoteConnectModal;
