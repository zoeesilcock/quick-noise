import React from 'react';
import PropTypes from 'prop-types';

class RemoteConnectButton extends React.Component {
  handleClick = () => {
    this.props.setConnectShow(true);
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>
          Connect to player
        </button>
      </div>
    );
  }
}

RemoteConnectButton.propTypes = {
  setConnectShow: PropTypes.func.isRequired,
}

export default RemoteConnectButton;
