import React from 'react';
import './App.css';
import ArrayVisualizer from './components/ArrayVisualizer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Interactive Array Visualizer</h1>
        <ArrayVisualizer />
      </header>
    </div>
  );
}

export default App;
