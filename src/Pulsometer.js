import React, { Component } from 'react';
import "./pulsometer.scss";

let isActive = false;

class Pulsometer extends Component  {

  constructor() {
    super();
    this.state = {
      dotActive: false
    }
  } 

  timeLoop = () => {
    setInterval(function(){
      console.log('second');
    },1000) 
  }

  pulseDot = () => {
    this.setState({dotActive: true}); 
  }

  configureWebSocket = () => { 

    var websocket = this.props.websocket;

    websocket.onopen = (evt) => { 
      websocket.onmessage = (evt) => { 
        //console.log(this); 
        //this.setState({dotActive: true}) 
        this.pulseDot();
      } 
    }

  } 

  componentDidMount() {
    this.configureWebSocket();
    this.timeLoop();
  }

  render() { 

    const dotActive = this.state.dotActive;

    return (
      <div>
        <div>Pulsometer</div>
        <br />
        <div className="dots"  >
          <div className={`dot ${dotActive ? "on" : "off"}`} />
          <div className={`dot ${dotActive ? "on" : "off"}`} />
          <div className={`dot ${dotActive ? "on" : "off"}`} />
          <div className={`dot ${dotActive ? "on" : "off"}`} />
          <div className={`dot ${dotActive ? "on" : "off"}`} />
        </div>
      </div>
    )
  }

}

export default Pulsometer;
