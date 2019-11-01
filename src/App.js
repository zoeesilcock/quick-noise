import React from 'react';
import Tone from 'tone';
import './App.css';

let noise = null;

function initNoise() {
  noise = new Tone.Noise("brown").toMaster();
  noise._playbackRate = 0.1;
}

function toggleNoise() {
  if (noise == null) {
    initNoise();
  }

  if (noise.state === 'stopped') {
    noise.start();
  } else {
    noise.stop();
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Quick Noise</h1>
        <button onClick={() => toggleNoise()}>Toggle noise</button>
      </header>
    </div>
  );
}

export default App;
