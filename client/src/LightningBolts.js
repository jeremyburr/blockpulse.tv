import React, { Component } from 'react';
import "./pulsometer.scss"; 
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
  ];

  let clearLoop = undefined;

class LightningBolts extends Component  {
  constructor() {
    super();
    this.state = {
      bolts: bolts ,
      cue: 0,
      clearingCue: false,
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
  
  getBoltsAvailable = () => { 
    let boltsActive = 0; 
    for (const bolt of this.state.bolts) { 
      if (bolt.active) boltsActive++ 
    } 
    return this.state.bolts.length - boltsActive;
  }

  clearCue = () => { 

    console.log('clearCue()'); 

    const clearingCue = setInterval(()=>{

      console.log('clearingCue()',this.state.cue,' bolts'); 

      let clearLoop = false; 

      if (this.state.cue < this.getBoltsAvailable()) {
        clearLoop = true;
      } 

      const boltsToClear = clearLoop ? this.state.cue : this.state.bolts.length;

      this.setState({
        bolts:this.state.bolts.map(bolt=>{
          if (this.state.bolts.indexOf(bolt) < this.getBoltsAvailable()) {
            bolt.active = true;
          } 
          return bolt; 
        }),
        cue: this.state.cue - this.getBoltsAvailable(),
        clearingCue: clearLoop ? false : true
      })
      
    },750) 

  } 

  incrementCue = () => { 
    this.setState({cue:this.state.cue+1}) 
  } 

  sendBolt = () => { 
    const boltsAvailable = this.getBoltsAvailable();
    this.setState({ 
      bolts:this.state.bolts.map(bolt => { 
        if (this.state.bolts.indexOf(bolt) >= this.state.bolts.length - this.getBoltsAvailable()) { 
          bolt.active = true; 
          bolt.timestamp = Date.now(); 
        } 
        return bolt; 
      })
    })
  } 

  atCapacity = () => this.getBoltsAvailable() === 0;

  socketEvent = () => { 
    let atCapacity = this.atCapacity(); 
    if (atCapacity || this.state.clearingCue) { 
      this.incrementCue(); 
    } 
    else if (!atCapacity) { 
      this.sendBolt(); 
    } 
  } 

  componentDidMount() {
    this.configureWebSocket();
  } 

  componentDidUpdate() { 
    //console.log('state cue',this.state.cue); 
    if ((this.state.cue > 0) && (!this.state.clearingCue)) {
      console.log('setState: clearingCue');
      this.setState({clearingCue: true}, this.clearCue());
    }
  }

  resetBolt = (boltIndex) => { 
    this.setState({
      bolts: this.state.bolts.map(bolt=>{
        if (this.state.bolts.indexOf(bolt === boltIndex)) {
            bolt.active = false;
        }
        return bolt; 
      })
    }) 
  }

  render() { 

    let dValues = "M 40 5 L 40 25 L 40 25 L 35 25 L 40 50 L 40 30 L 45 30 L 40 5" 
    let viewBox = "0 0 400 400";

    // Separate into path class component for better rendering optimization?

    return (
      <svg id="svg-lightning-bolt" viewBox={viewBox} className="lightning-bolt"> 
        {this.state.bolts.map((bolt,index) => (
          <path onAnimationEnd={()=>this.resetBolt(index)} key={index} className={`bolt bolt-${index} ${bolt.active ? "on" : "off"}`} d={dValues} /> 
        ))} 
      </svg>
    ) 

  } 

}

export default LightningBolts;