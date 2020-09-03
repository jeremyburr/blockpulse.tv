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

  pulseDot = () => {

  }

  configureWebSocket = () => { 

    var websocket = this.props.websocket;

    websocket.onopen = (evt) => { 
      websocket.onmessage = (evt) => { 
        console.log(this); 
        //this.setState({dotActive: true}) 
        this.pulseDot();
      } 
    }

  } 

  componentDidMount() {
    this.configureWebSocket();
  }

  render() { 

    const dotActive = this.state.dotActive;

    return (
      <div>
        <div>Pulsometer</div>
        <br />
        <div className={`dot ${dotActive ? "on" : "off"}`} />
      </div>
    )
  }

}

export default Pulsometer;
