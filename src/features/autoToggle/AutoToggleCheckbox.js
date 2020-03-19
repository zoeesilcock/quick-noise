import React from 'react';
import PropTypes from 'prop-types';

import './AutoToggleCheckbox.css';

class AutoToggleCheckbox extends React.Component {
  handleAutoToggleChange = (event) => {
    this.props.setAutoToggle(event.target.checked);
  }

  render() {
    return (
      <div className="AutoToggle-body">
        <label htmlFor="autoToggle">
          <input
            className="AutoToggle-checkbox"
            type="checkbox"
            name="autoToggle"
            id="autoToggle"
            onChange={this.handleAutoToggleChange}
            checked={this.props.autoToggle}
          />
          Auto toggle
        </label>
        <p className="AppModeToggle-description">
          Enable this to toggle the noise when you open the app.
        </p>
      </div>
    );
  }
}

AutoToggleCheckbox.propTypes = {
  autoToggle: PropTypes.bool.isRequired,
  setAutoToggle: PropTypes.func.isRequired,
}

export default AutoToggleCheckbox;
