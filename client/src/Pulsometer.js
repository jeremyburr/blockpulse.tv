import React, { Component } from 'react';
import "./pulsometer.scss";
import LightningBolts from "./LightningBolts.js";
//import $ from "jquery";

const bolts =  
  [
    {active: false, timestamp: Date.now()},
    {active: false, timestamp: Date.now()},
    {active: false, timestamp: Date.now()},
    {active: false, timestamp: Date.now()},
    {active: false, timestamp: Date.now()},
    /*{active: false, timestamp: Date.now()},
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

  /*clearCue = (openBolts) => { 
    let boltsChanged = 0; 
    const bolts = this.state.bolts.map(bolt => { 
      if (this.state.bolts.indexOf(bolt) <= openBolts) { 
        bolt.active = true;
        boltsChanged++;
      } 
      return bolt; 
    }) 
    /*this.setState({
      bolts:bolts,
      cue:this.state.cue - boltsChanged
    }) */
 // } 

  resetBolts = () => { 
    let boltsReset = 0; 
    // Optimized array copy approach (instead of .map) when item index is known in advance
    const bolts = this.state.bolts.map(bolt => { 
      let expired = Date.now() - bolt.timestamp > 750;
      if ((bolt.active) && (Date.now() - bolt.timestamp > 750)) { 
        bolt.active = false;
        boltsReset++; 
      } 
      return bolt; 
    }) 
  }

  incrementCue = () => { 
    this.setState({cue:this.state.cue+1}) 
  } 

  sendBolt = () => { 
    const boltsActive = this.getBoltsActive();
    const updatedLightningBolts = this.state.bolts.map(bolt => { 
      if (this.state.bolts.indexOf(bolt) === boltsActive) { 
        bolt.active = true; 
        bolt.timestamp = Date.now(); 
      } 
      return bolt; 
    })
    this.setState({ 
      bolts: updatedLightningBolts,
    },()=>{setTimeout(()=>{this.resetBolts()},750)})
  } 

  atCapacity = () => this.state.bolts.length === this.getBoltsActive(); 

  socketEvent = () => { 
    // Add clearCue state property for edge case when capacity indicator is false during a cue clearing 
    console.log('getBoltsActive()',this.getBoltsActive());

    let atCapacity = this.atCapacity();

    if (!atCapacity) { 
      this.sendBolt(); 
      console.log('not capacity');
    } 
    else if (atCapacity) { 
      console.log('at capacity');
      this.incrementCue(); 
    } 
  } 

  componentDidMount() {
    this.configureWebSocket();
  }

  // Optimization inside componentWillUpdate/shouldComponentUpdate?

  componentDidUpdate() { 
     
    console.log('state cue',this.state.cue); 

    let atCapacity = this.atCapacity();

    //if (atCapacity) this.clearCue();

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
