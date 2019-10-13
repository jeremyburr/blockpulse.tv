import React, { Component } from 'react';
import Circles from './Circles.js';

var wsUri = "ws://67.205.134.170:8090"; 
var websocket = new WebSocket(wsUri); 

class App extends Component {
	constructor() {
		super();
		this.state = {
			websocket: websocket 
		};
	}

	render() { 
		return (
			<div>
        <Circles websocket={this.state.websocket} />
			</div>
		);
  }
}

export default App;
