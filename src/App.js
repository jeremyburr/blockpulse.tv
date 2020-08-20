import React, { Component } from 'react';
import Circles from './Circles.js';
import LineChart from './LineChart.js';

var wsUri = "ws://67.205.134.170:8090"; 
var websocket = new WebSocket(wsUri); 

class App extends Component {

  render() { 
    return (
      <div>
        {/*<Circles websocket={websocket} />*/}
        <LineChart />
      </div>
    );
  }
}

export default App;
