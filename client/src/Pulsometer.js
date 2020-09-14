import React, { Component } from 'react';
import "./pulsometer.scss";
import LightningBolt from "./LightningBolt.js";
import $ from "jquery";


class Pulsometer extends Component  {

  constructor() {
    super();
    this.state = {
      eventCount: 0,
      activeBolts: [false,false,false,false,false,false,false,false,false,false,false]
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

        console.log("activebolts[i]",this.state.activeBolts[i]); 

        if (!this.state.activeBolts[i]) {
          $(".bolt-"+i).css("animation-name", "bolt-"+i);
          this.setState({activeBolts:this.state.activeBolts[i]=true});

          setTimeout(function(){ 
            $(".bolt-"+i).css("animation-name", "none"); 
            this.setState({activeBolts:this.state.activeBolts[i]=false});

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
              <LightningBolt /> 
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
