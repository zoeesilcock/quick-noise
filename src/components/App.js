import React from 'react';
import Tone from 'tone';
import io from 'socket.io-client';

import './App.css';
import RemoteToggle from './RemoteToggle';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isRemote: true };
    this.noise = null;

    const port = process.env.REACT_APP_API_PORT || 5000;
    this.socket = io(`${window.location.hostname}:${port}`);
    this.socket.on('toggle noise', () => {
      if (!this.state.isRemote) {
        this.togglePlayer();
      }
    });
  }

  initNoise() {
    this.noise = new Tone.Noise("brown").toMaster();
    this.noise._playbackRate = 0.1;
  }

  toggleNoise() {
    if (this.state.isRemote) {
      this.socket.emit('toggle noise');
    } else {
      this.togglePlayer();
    }
  }

  togglePlayer() {
    if (this.noise == null) {
      this.initNoise();
    }

    if (this.noise.state === 'stopped') {
      this.noise.start();
    } else {
      this.noise.stop();
    }
  }

  toggleRemote() {
    this.setState({ isRemote: !this.state.isRemote });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Quick Noise</h1>
          <button className="App-button" onClick={() => this.toggleNoise()}>Toggle noise</button>
          <br/>
          <RemoteToggle isRemote={this.state.isRemote} onClick={() => this.toggleRemote()} />
        </header>
      </div>
    );
  }
}

export default App;
