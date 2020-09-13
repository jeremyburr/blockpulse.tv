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
            {/*<svg className="beam" width="300" height="300"> 
            <path d="M100,100 a1,1 0 0,1 100,0" stroke="orange" fill="none" /> 
            <animateTransform attributeType="xml" 
                attributeName="transform" 
                type="scale"
                dur='5s'
                values="1;6"
                repeatCount="indefinite"
    additive="sum"/>
    </svg>*/}
        </div> 
        
        <div className="pulsedot">
          {/*<div>Pulsometer</div>
          <br />
          <div className="dots"  >
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
          </div>*/}
        </div> 
        <div>
          <div className={`pulse ${this.props.pulse ? "on" : "off"}`} />
        </div> 
      </div>
    )
  }

}

export default Pulsometer;
