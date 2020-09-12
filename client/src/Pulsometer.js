import React, { Component } from 'react';
import "./pulsometer.scss";
import PulseDot from "./PulseDot.js";
import LightningBolt from "./LightningBolt.js";

class Pulsometer extends Component  {

  constructor() {
    super();
    this.state = {
      pulse: false
    }
  } 

  timeLoop = () => {
    setInterval(function(){
      //console.log('second');
    },1000) 
  }

  pulseDot = () => {
    this.setState({pulse: true}); 
    setTimeout( () => {
      this.setState({pulse: false})
    },1)
  } 

  configureWebSocket = () => { 

    var websocket = this.props.websocket;

    websocket.onopen = (evt) => { 
      websocket.onmessage = (evt) => { 
        //console.log('event');
        console.log(JSON.parse(evt.data));
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
    //if (this.state.pulse) this.setState({pulse:false});
    //console.log(this.state.pulse);
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
            <svg className="beam" width="300" height="300"> 
            <path d="M100,100 a1,1 0 0,1 100,0" stroke="orange" fill="none" /> 
            <animateTransform attributeType="xml" 
                attributeName="transform" 
                type="scale"
                dur='5s'
                values="1;6"
                repeatCount="indefinite"
    additive="sum"/>
            </svg>
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
