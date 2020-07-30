import React from 'react';
import logo from './logo.svg';
import { KeyGenerator } from './features/keyGenerator/KeyGenerator';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <KeyGenerator />
      </header>
    </div>
  );
}

export default App;
