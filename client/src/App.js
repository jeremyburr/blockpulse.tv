import React, { Component } from 'react';
import Pulsometer from './Pulsometer.js';

var wsUri = "ws://67.205.134.170:8090"; 
var websocket = new WebSocket(wsUri); 

class App extends Component {

  render() { 
    return (
      <div className="app">
        <Pulsometer websocket={websocket} />
      </div>
    )
  }
}

export default App;
