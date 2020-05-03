import React from 'react';
import PropTypes from 'prop-types';

class AddRemoteButton extends React.Component {
  handleClick = () => {
    this.props.addRemote();
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick} disabled={this.props.isFetching}>
          Add a remote
        </button>
      </div>
    );
  }
}

AddRemoteButton.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  addRemote: PropTypes.func.isRequired,
}

export default AddRemoteButton;
