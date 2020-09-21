import React, { Component } from 'react';
import "./pulsometer.scss";
import LightningBolts from "./LightningBolts.js";
//import $ from "jquery";

const bolts =  
  [
    {active: false, timestamp: Date.now()},
    {active: false, timestamp: Date.now()},
    {active: false, timestamp: Date.now()}
    /*{active: false, timestamp: Date.now()},
    {active: false, timestamp: Date.now()},
    {active: false, timestamp: Date.now()},
    {active: false, timestamp: Date.now()},
    {active: false, timestamp: Date.now()},
    {active: false, timestamp: Date.now()},
    {active: false, timestamp: Date.now()},
    {active: false, timestamp: Date.now()}*/
  ]

class Pulsometer extends Component  { 
  constructor() {
    super();
    this.state = {
      cue: 0,
      bolts: bolts
    }
  } 

  configureWebSocket = () => { 
    var websocket = this.props.websocket; 
    websocket.onopen = (evt) => { 
      websocket.onmessage = (evt) => { 
        //console.log(JSON.parse(evt.data));
        this.socketEvent();
      } 
    } 
  }
  
  getBoltsActive = () => { 
    let boltsActive = 0; 
    for (const bolt of this.state.bolts) { 
      if (bolt.active) boltsActive++ 
    } 
    return boltsActive;
  } 

  clearCue = (openBolts) => { 
    let boltsChanged = 0; 
    const bolts = this.state.bolts.map(bolt => { 
      if (this.state.bolts.indexOf(bolt) <= openBolts) { 
        bolt.active = true;
        boltsChanged++;
      } 
      return bolt; 
    }) 
    this.setState({
      bolts:bolts,
      cue:this.state.cue - boltsChanged
    }) 
  } 

  resetBolts = () => { 
    let boltsReset = 0; 
    const bolts = this.state.bolts.map(bolt => { 
      let expired = Date.now() - bolt.timestamp > 750;
      if ((bolt.active) && (Date.now() - bolt.timestamp > 750)) { 
        bolt.active = false;
        boltsReset++; 
      } 
      return bolt; 
    }) 
    if (boltsReset > 0) { 
      this.setState({
        bolts:bolts,
      }) 
    }
  }

  incrementCue = () => { 
    this.setState({cue:this.state.cue+1}) 
  }

  sendBolt = () => { 
    const updatedLightningBolts = this.state.bolts.map(bolt => { 
      if (this.state.bolts.indexOf(bolt) === this.getBoltsActive()) { 
        bolt.active = true; 
        bolt.timestamp = Date.now(); 
      } 
      return bolt; 
    }) 
    this.setState({ 
      bolts: updatedLightningBolts,
    },()=>{setTimeout(()=>{this.resetBolts()},750)}) 
  } 

  socketEvent = () => { 
    let atCapacity = this.state.bolts.length === this.getBoltsActive(); 
    if (!atCapacity) { 
      this.sendBolt(); 
    } 
    else if (atCapacity) { 
      this.incrementCue(); 
    } 
  } 

  getOpenBolts = () => { 
    let openBolts = 0; 
    for (const bolt of this.state.bolts ) { 
      if ((bolt.active) && (Date.now() - bolt.timestamp > 750)) { 
        openBolts++
      } 
    } 
    return openBolts; 
  }  

  componentDidMount() {
    this.configureWebSocket();
  }

  // Optimization inside componentWillUpdate/shouldComponentUpdate?

  componentDidUpdate() { 
    this.resetBolts(); 
    const openBolts = this.getOpenBolts(); 
    if ((this.state.cue>0) && (openBolts>0)) {
      this.clearCue(openBolts); 
    } 
    console.log('state cue',this.state.cue); 
  }

  render() { 
    return ( 
      <div className="container-pulsometer">
        <div className="pulsometer">
          <div className="antenna" >
            <div className="bulb" > 
              <LightningBolts bolts={this.state.bolts} /> 
            </div>
          </div>
          <div className="header">
            Raw TX Pulsometer
          </div> 
        </div> 
        <div>
        </div> 
      </div>
    )
  } 
}

export default Pulsometer;
