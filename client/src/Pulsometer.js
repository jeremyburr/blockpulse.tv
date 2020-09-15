import React, { Component } from 'react';
import "./pulsometer.scss";
import LightningBolts from "./LightningBolts.js";
import $ from "jquery";

  const initialBolts =  
    [
      {position: 0, active: false},
      {position: 1, active: false},
      {position: 2, active: false},
      {position: 3, active: false},
      {position: 4, active: false},
      {position: 5, active: false},
      {position: 6, active: false},
      {position: 7, active: false},
      {position: 8, active: false},
      {position: 9, active: false},
      {position: 10, active: false} 
    ]

class Pulsometer extends Component  {

  constructor() {
    super();
    this.state = {
      eventCount: 0,
      boltsActive: 0,
      lightningBolts: initialBolts
    }
  } 

  timeLoop = () => {
    setInterval(function(){
      //console.log('second');
    },1000) 
  }

  addEvent = () => { 

    if (this.state.boltsActive < 10) {

      const inactiveBolt = this.state.lightningBolts.find(bolt => {

        console.log('bolt',bolt);
        
        return bolt.active === false
        
       });

      //console.log(inactiveBolt);

      if (inactiveBolt !== undefined) { 

        const position = inactiveBolt.position;

        //console.log(position); 

        const updatedLightningBolts = this.state.lightningBolts.map(bolt => {
          //console.log('bolt position',bolt.position);

          if (bolt.position === position) { console.log('matches: ',bolt.position)}
          bolt.active = true;
          return bolt; 
        })
        

        this.setState({ 
          lightningBolts: updatedLightningBolts,
          boltsActive: this.state.boltsActive + 1,
          eventCount: this.state.eventCount + 1
        })


      }


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
    this.timeLoop();
  }

  componentDidUpdate() { 
    //console.log(this.state.eventCount); 
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
