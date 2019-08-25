import React from 'react';
import logo from './logo.svg';
import './App.css';

var wsUri = "wss://ws.blockchain.info/inv"; 

var websocket = new WebSocket(wsUri);
console.log('websocket',websocket);

websocket.onopen = function(evt) { 
	console.log('websocket open event'); 

	websocket.send('{"op":"unconfirmed_sub"}');
};


websocket.onmessage = function(evt) { 
	console.log('evt',evt);
};


/*websocket.onclose = function(evt) { onClose(evt) };
websocket.onerror = function(evt) { onError(evt) };*/ 


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
