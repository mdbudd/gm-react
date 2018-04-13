import React, { Component } from 'react';
import './App.css';
import MapComponent from './MapComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Google Map Component</h1>
        </header>
        <MapComponent />
      </div>
    );
  }
}

export default App;
