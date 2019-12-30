import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import './AddRemoteCode.css';

class AddRemoteCode extends React.Component {
  handleClose = () => {
    this.props.hideCode();
  }

  render() {
    let jsx = null;
    const remoteCode = this.props.newRemoteCode ? this.props.newRemoteCode.toString() : '';
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

    if (this.props.isShowingCode) {
      jsx = (
        <Modal
          isOpen={this.props.isShowingCode}
          onRequestClose={this.handleClose}
          contentLabel="New remote"
          style={modalStyles}
        >
          <h1>Remote code</h1>
          <div>Enter this code on your remote device:</div>
          <div className="AddRemoteCode-code">
            {remoteCode.substr(0, 4)}-{remoteCode.substr(4, 4)}
          </div>
          <br/>
          <button onClick={this.handleClose}>Close</button>
        </Modal>
      );
    }

    return (jsx);
  }
}

AddRemoteCode.propTypes = {
  isShowingCode: PropTypes.bool.isRequired,
  hideCode: PropTypes.func.isRequired,
  newRemoteCode: PropTypes.number,
}

export default AddRemoteCode;
