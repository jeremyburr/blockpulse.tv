import React, { Component } from 'react';
import "./pulsometer.scss";
//import PulseDot from "./PulseDot.js";
import LightningBolt from "./LightningBolt.js";


class Pulsometer extends Component  {

  constructor() {
    super();
    this.state = {
      eventCount: 0
    }
  } 

  timeLoop = () => {
    setInterval(function(){
      //console.log('second');
    },1000) 
  }

  addEvent = () => {
    this.setState({eventCount: this.state.eventCount+=1}); 
  } 

  configureWebSocket = () => { 

    var websocket = this.props.websocket;

    websocket.onopen = (evt) => { 
      websocket.onmessage = (evt) => { 
        //console.log(JSON.parse(evt.data));
        this.addEvent();
      } 
    }

  } 

  componentDidMount() {
    this.configureWebSocket();
    this.timeLoop();
  }

  componentDidUpdate() {

    console.log(this.state.eventCount);


  }

  render() { 

    return (
    
      <div className="container-pulsometer">
        <div className="pulsometer">
          <div className="antenna" >
            <div className="bulb" > 
              <LightningBolt /> 
            </div>
          </div>
          <div className="header">
            Raw TX Pulsometer
          </div> 
        </div> 
        <div>
          {/*<div className={`pulse ${this.props.pulse ? "on" : "off"}`} />*/}
        </div> 
      </div>
    )
  }

}

export default Pulsometer;
