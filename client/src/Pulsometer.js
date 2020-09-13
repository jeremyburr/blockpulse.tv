import React, { Component } from 'react';
import "./pulsometer.scss";
import LightningBolt from "./LightningBolt.js";
import $ from "jquery";


class Pulsometer extends Component  {

  constructor() {
    super();
    this.state = {
      eventCount: 0,
      bolt_0: "off",
      bolt_1: "off",
      bolt_2: "off",
      bolt_3: "off",
      bolt_4: "off",
      bolt_5: "off",
      bolt_6: "off",
      bolt_7: "off",
      bolt_8: "off",
      bolt_9: "off",
      bolt_10: "off",
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

      for (let i=0; i<this.state.eventCount; i++) { 


        
        //console.log(this.state.bolt)


      }

    }

    console.log(this.state.eventCount); 

    $(".bolt-0").css("animation-name", "none");

    setTimeout(function(){ 
      $(".bolt-0").css("animation-name", "bolt-0"); 
    })


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
