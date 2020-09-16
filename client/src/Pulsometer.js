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
    if (this.state.boltsActive < 11) { 
      const inactiveBolt = this.state.lightningBolts.find(bolt => { 
        return bolt.active === false 
      }); 

      if (inactiveBolt !== undefined) { 
        const position = inactiveBolt.position; 
        const updatedLightningBolts = this.state.lightningBolts.map(bolt => { 
          if (bolt.position === position) { 
            bolt.active = true; 
          } 
          return bolt; 
        }) 
        this.setState({ 
          lightningBolts: updatedLightningBolts,
          boltsActive: this.state.boltsActive + 1,
          eventCount: this.state.eventCount + 1
        },()=>{
          setTimeout(() => { 
            this.setState(state => ({ 
              lightningBolts: state.lightningBolts.map(bolt => {
                // console.log('bolt.position',bolt.position);
                if (bolt.position === position) { 
                  console.log('matches, position: ',bolt.position)
                 // bolt.active = false; 
                }
                return bolt;
              })  
            })); 

          console.log('callback timeout 750')

          },750)

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
