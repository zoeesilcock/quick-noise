import React from 'react';

import './App.css';

import AppModeContainer from '../features/appMode/AppModeContainer';
import NoiseToggleContainer from '../features/noise/NoiseToggleContainer';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Quick Noise</h1>
          <NoiseToggleContainer />
          <br/>
          <AppModeContainer />
        </header>
      </div>
    );
  }
}

export default App;
