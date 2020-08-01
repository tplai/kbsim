import React from 'react';
// import logo from './logo.svg';
import { KeySimulator } from './features/keySimulator/KeySimulator';
import './App.css';
// <img src={logo} className="App-logo" alt="logo" />

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <KeySimulator />
      </header>
    </div>
  );
}

export default App;
