import React, { Component } from 'react';
import Circles from './Circles.js';

var wsUri = "wss://ws.blockchain.info/inv"; 
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
				 BlockPulse.tv 
			<Circles websocket={this.state.websocket} />
			</div>
		);
  }
}

export default App;
