import React, { Component } from 'react';
import "./pulsometer.scss";
import LightningBolts from "./LightningBolts.js";
import $ from "jquery";

  const bolts =  
    [
      {active: false, timestamp: Date.now()},
      {active: false, timestamp: Date.now()},
      {active: false, timestamp: Date.now()},
      {active: false, timestamp: Date.now()},
      {active: false, timestamp: Date.now()},
      {active: false, timestamp: Date.now()},
      {active: false, timestamp: Date.now()},
      {active: false, timestamp: Date.now()},
      {active: false, timestamp: Date.now()},
      {active: false, timestamp: Date.now()},
      {active: false, timestamp: Date.now()}
    ]

class Pulsometer extends Component  {

  constructor() {
    super();
    this.state = {
      boltsActive: 0,
      cue: 0,
      clearCue: false,
      bolts: bolts
    }
  } 

  listenForCue = () => { 
    if (this.state.cue > 0) {
      this.clearCue(); 
    } 
  }

  clearCue = () => { 
    this.setState({clearCue: true}); 
    const boltCount = this.state.bolts.length - this.state.boltsActive; 
    let boltsChanged = 0; 
    const newBolts = this.state.bolts.map(bolt => { 
      if ( (this.state.bolts.indexOf(bolt) <= boltCount) && (Date.now() - bolt.timestamp > 750) ) { 
        bolt.active = true;
        boltsChanged++;
      } 
      return bolt; 
    }) 
    this.setState({
      bolts:newBolts,
      clearCue:false,
      cue:this.state.cue - boltsChanged
    }) 
  } 

    resetBolts = () => { 
      let newBoltsActive = 0;
      const newBolts = this.state.bolts.map(bolt => { 
        if ( (bolt.active ) && (Date.now() - bolt.timestamp > 750)) { 
          bolt.active = false;
          newBoltsActive++;
        } 
        return bolt; 
      }) 
      this.setState({
        bolts:bolts,
        boltsActive:this.boltsActive + newBoltsActive
      }) 
    }

  incrementCue = () => { 
    this.setState({cue:this.state.cue+1}) 
  }

  sendBolt = () => { 
    let boltsActiveDelta = 0; 
    const updatedLightningBolts = this.state.bolts.map(bolt => { 
      if (this.state.bolts.indexOf(bolt) === this.state.bolts.length - this.state.boltsActive) { 
        bolt.active = true; 
        bolt.timestamp = Date.now(); 
        boltsActiveDelta++;
      } 
      if ( (bolt.active) && (Date.now() - bolt.timestamp > 750) ) { 
        bolt.active = false;
        boltsActiveDelta--;
      } 
      return bolt; 
    }) 
    this.setState({ 
      bolts: updatedLightningBolts,
      boltsActive:this.state.boltsActive + boltsActiveDelta
    }) 
  }
  

  addEvent = () => { 
    if (!this.state.clearCue) { 
      this.sendBolt(); 
    } 
    if (this.state.clearCue) { 
      this.incrementCue(); 
    } 
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
    this.listenForCue();
  }

  componentDidUpdate() { 
    if ( (this.state.cue !== 0) && (this.state.clearCue === false) ) { 
      this.clearCue(); 
      this.resetBolts(); 
      console.log('state cue',this.state.cue);
    } 

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
