import React from 'react';
import { connect } from 'react-redux';

import { setAutoToggle } from './autoToggleSlice';
import AutoToggleCheckbox from './AutoToggleCheckbox';

const mapStateToProps = state => ({
  autoToggle: state.autoToggle,
});

const mapDispatchToProps = { setAutoToggle };

class AddRemoteContainer extends React.Component {
  render() {
    return (
      <AutoToggleCheckbox
        autoToggle={this.props.autoToggle}
        setAutoToggle={this.props.setAutoToggle}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRemoteContainer);
