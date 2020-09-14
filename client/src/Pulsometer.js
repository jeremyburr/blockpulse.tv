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
      lightningBolts: initialBolts
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

    if (this.state.eventCount > 0) {

      /*for (let i=0; i<this.state.eventCount; i++) { 

        console.log("activebolts[i]",this.state.lightningBolts[i]); 

        if (!this.state.lightningBolts[i]) {
          $(".bolt-"+i).css("animation-name", "bolt-"+i);
          this.setState({lightningBolts:this.state.activeBolts[i]=true});

          setTimeout(function(){ 
            $(".bolt-"+i).css("animation-name", "none"); 
            this.setState({lightningBolts:this.state.activeBolts[i]=false});

          },750)
        } 

      }*/

    }

    console.log(this.state.eventCount); 


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
          {/*<div className={`pulse ${this.props.pulse ? "on" : "off"}`} />*/}
        </div> 
      </div>
    )
  }

}

export default Pulsometer;
