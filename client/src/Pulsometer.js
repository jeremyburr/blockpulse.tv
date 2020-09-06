import React, { Component } from 'react';
import "./pulsometer.scss";
import PulseDot from "./PulseDot.js";

class Pulsometer extends Component  {

  constructor() {
    super();
    this.state = {
      pulse: false
    }
  } 

  timeLoop = () => {
    setInterval(function(){
      //console.log('second');
    },1000) 
  }

  pulseDot = () => {
    this.setState({pulse: true}); 
    setTimeout( () => {
      this.setState({pulse: false})
    },1)
  } 

  configureWebSocket = () => { 

    var websocket = this.props.websocket;

    websocket.onopen = (evt) => { 
      websocket.onmessage = (evt) => { 
        //console.log('event');
        console.log(JSON.parse(evt.data));
        //console.log(this); 
        //this.setState({pulse: true}) 
        this.pulseDot();
      } 
    }

  } 

  componentDidMount() {
    this.configureWebSocket();
    this.timeLoop();
  }

  componentDidUpdate() {
    //if (this.state.pulse) this.setState({pulse:false});
    //console.log(this.state.pulse);
  }

  render() { 

    return (
    
      <div>
      <div className="pulsometer">
        <div className="antenna"/>
        Bitcoin Raw TX <br />Pulsometer
        {/*BlockPulse.TV*/}
      </div> 
        <div className="pulsedot">
          {/*<div>Pulsometer</div>
          <br />
          <div className="dots"  >
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
          </div>*/}
          <PulseDot pulse={this.state.pulse} />
        </div>
        
        <div>
          <div className={`dot ${this.props.pulse ? "on" : "off"}`} />
        </div>

      </div>
    )
  }

}

export default Pulsometer;
