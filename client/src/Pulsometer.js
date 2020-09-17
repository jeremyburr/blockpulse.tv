import React, { Component } from 'react';
import "./pulsometer.scss";
import LightningBolts from "./LightningBolts.js";
import $ from "jquery";

  const initialBolts =  
    [
      {position: 0, active: false, timestamp: Date.now()},
      {position: 1, active: false, timestamp: Date.now()},
      {position: 2, active: false, timestamp: Date.now()},
      {position: 3, active: false, timestamp: Date.now()},
      /*{position: 4, active: false, timestamp: Date.now()},
      {position: 5, active: false, timestamp: Date.now()},
      {position: 6, active: false, timestamp: Date.now()},
      {position: 7, active: false, timestamp: Date.now()},
      {position: 8, active: false, timestamp: Date.now()},
      {position: 9, active: false, timestamp: Date.now()},
      {position: 10, active: false, timestamp: Date.now()} */
    ]

class Pulsometer extends Component  {

  constructor() {
    super();
    this.state = {
      cue: 0,
      boltsActive: 0,
      lightningBolts: initialBolts
    }
  } 

  clearCue = () => { 

    console.log('clear cue');

    if (this.state.cue === 0) return;

    var cue = this.state.cue;

    console.log(cue);

    for (let i = 0; i < cue; i++) { 
      console.log('run cue loop '); 
    }

    //this.setState({cue:0}); 

  }

  addEvent = () => { 

      // If Inactive Bolt
      
      const inactiveBolt = this.state.lightningBolts.find(bolt => { 
        return bolt.active === false 
      }); 

      if (inactiveBolt !== undefined) { 
               
        const position = inactiveBolt.position; 

        const updatedLightningBolts = this.state.lightningBolts.map(bolt => { 
          if (bolt.position === position) { 
            bolt.active = true; 
            bolt.timestamp = Date.now(); 
          } 
          else if (bolt.active && (Date.now() - bolt.timestamp > 750)) { 
            bolt.active = false;
            bolt.timestamp = Date.now(); 
          } 
          return bolt; 
        }) 

        this.setState({ 
          lightningBolts: updatedLightningBolts,
        }) 
       
    } 

    else {
      console.log('increase state cue')
      this.setState({cue: this.state.cue+1})
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
  }

  componentDidUpdate() { 
    this.clearCue();
    console.log('state cue: ',this.state.cue); 
  }

  render() { 

    return (
    
      <div className="container-pulsometer">
        <div className="pulsometer">
          <div className="antenna" >
            <div className="bulb" > 
              <LightningBolts bolts={this.state.lightningBolts} /> 
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
