import React, { Component } from 'react';
import "./pulsometer.scss";
import PulseDot from "./PulseDot.js";

class Pulsometer extends Component  {

  constructor() {
    super();
    this.state = {
      pulse: false
    }
  } 

  timeLoop = () => {
    setInterval(function(){
      console.log('second');
    },1000) 
  }

  pulseDot = () => {
    this.setState({pulse: true}); 
  }

  configureWebSocket = () => { 

    var websocket = this.props.websocket;

    websocket.onopen = (evt) => { 
      websocket.onmessage = (evt) => { 
        //console.log(this); 
        //this.setState({pulse: true}) 
        this.pulseDot();
      } 
    }

  } 

  componentDidMount() {
    this.configureWebSocket();
    this.timeLoop();
  }

  componentDidUpdate() {
    console.log('updated');
  }

  render() { 

    return (
      <div>
        <div>Pulsometer</div>
        <br />
        <div className="dots"  >
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </div>
        <PulseDot pulse={this.state.pulse} />
      </div>
    )
  }

}

export default Pulsometer;
