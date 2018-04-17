import React, { Component } from 'react';
import './App.css';
import MapComponent from './MapComponent';

let markers = [
  { id: 1, title: 'Bournemouth', address: 'Bournemouth' },
  { id: 2, title: 'Edinburgh', address: 'Edinburgh' },
  { id: 3, title: 'Stirling', address: 'Stirling' },
  { id: 4, title: 'Germany', address: 'Germany' },
];


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Google Map Component</h1>
        </header>
        <MapComponent
          markers={markers}
          apiKey="AIzaSyAey7u198lGkRMVja1QsLmYlO4-GIa9wr0"
        />
      </div>
    );
  }
}

export default App;
