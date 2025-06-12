import React from 'react';
import './App.css';
import ArrayVisualizer from './components/ArrayVisualizer';
import ComingSoon from './components/ComingSoon';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Interactive Array Visualizer</h1>
        <ArrayVisualizer />
        <ComingSoon />
      </header>
    </div>
  );
}

export default App;
