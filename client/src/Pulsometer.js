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
      {position: 4, active: false, timestamp: Date.now()},
      {position: 5, active: false, timestamp: Date.now()},
      {position: 6, active: false, timestamp: Date.now()},
      {position: 7, active: false, timestamp: Date.now()},
      {position: 8, active: false, timestamp: Date.now()},
      {position: 9, active: false, timestamp: Date.now()},
      {position: 10, active: false, timestamp: Date.now()} 
    ]

class Pulsometer extends Component  {

  constructor() {
    super();
    this.state = {
      eventQue: 0,
      boltsActive: 0,
      lightningBolts: initialBolts
    }
  } 

  addEvent = () => { 
    
    if (this.state.boltsActive < 11) { 
      const inactiveBolt = this.state.lightningBolts.find(bolt => { 
        return bolt.active === false 
      }); 

        let eventQue = this.state.eventQue;
        let boltsActive = this.state.boltsActive;

      if (inactiveBolt !== undefined) { 
        const position = inactiveBolt.position; 
        const updatedLightningBolts = this.state.lightningBolts.map(bolt => { 

        const currentTime = Date.now(); 
        const boltTime = bolt.timestamp;

        
          if (bolt.position === position) { 
            bolt.active = true; 
            bolt.timestamp = Date.now(); 
            boltsActive++;
            eventQue++;
          } 
          else if (currentTime - boltTime > 750) { 
            bolt.timestamp = currentTime; 
            bolt.active = false;
            eventQue--;
            boltsActive--;
          }
          return bolt; 
        }) 
        this.setState({ 
          lightningBolts: updatedLightningBolts,
          boltsActive: boltsActive,
          eventQue: eventQue
        }) 
        console.log('boltsActive',boltsActive) 
      } 
    } 
    else {
      console.log('que');
      this.setState({eventQue: this.state.eventQue++});
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
    //console.log(this.state.eventQue); 
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
