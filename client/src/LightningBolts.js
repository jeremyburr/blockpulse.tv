import React, { Component } from 'react';
import "./pulsometer.scss"; 
//import $ from "jquery"; 

const bolts =  
  [false,false,false,false,
   false,false,false,false,
   false,false,false];

let clearBolts = undefined;

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
    for (const active of this.state.bolts) { 
      if (active) boltsActive++ 
    } 
    return this.state.bolts.length - boltsActive;
  }

  clearCue = () => { 

    clearBolts = setInterval(()=>{ 

      let clearLoop = false; 

      if (this.state.cue < this.getBoltsAvailable()) {
        clearLoop = true;
      } 

      const boltsToClear = clearLoop ? this.state.cue : this.state.bolts.length;

      console.log('this.getBoltsAvailable()',this.getBoltsAvailable());
      console.log('this.state.cue',this.state.cue);
      console.log('boltsToClear',boltsToClear);

      this.setState({
        bolts:this.state.bolts.map(bolt=>{
          if (this.state.bolts.indexOf(bolt) < boltsToClear) {
            bolt = true;
          } 
          return bolt; 
        }),
        cue: this.state.cue - boltsToClear,
        clearingCue: clearLoop ? false : true
      })

      if (clearLoop) {
        clearInterval(clearBolts);
      }
      
    },750) 

  } 

  incrementCue = () => { 
    this.setState({cue:this.state.cue+1}) 
  } 

  sendBolt = () => { 
    this.setState({ 
      bolts:this.state.bolts.map(bolt => { 
        if (this.state.bolts.indexOf(bolt) === (this.state.bolts.length - this.getBoltsAvailable()) ) { 
          bolt = true; 
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
    //console.log(this.state.cue);
    if ((this.state.cue > 0) && (!this.state.clearingCue)) {
      this.setState({clearingCue: true}, this.clearCue());
    }
  }

  resetBolt = (boltIndex) => { 
    this.setState({
      bolts: this.state.bolts.map(bolt=>{
        if (this.state.bolts.indexOf(bolt === boltIndex)) {
            bolt = false;
        }
        return bolt; 
      })
    }) 
  }
  
  // LOOK INTO LIFECYCLE METHODS FOR OPTIMIZATION RENDERING - componentDidMount, componentDidUpdate, componentWillUnmount, componentShouldUpdate?

  render() { 

    let dValues = "M 40 5 L 40 25 L 40 25 L 35 25 L 40 50 L 40 30 L 45 30 L 40 5" 
    let viewBox = "0 0 400 400";

    return (
      <svg id="svg-lightning-bolt" viewBox={viewBox} className="lightning-bolt"> 
        {this.state.bolts.map((bolt,index) => (
          <path onAnimationEnd={()=>this.resetBolt(index)} key={index} className={`bolt bolt-${index} ${bolt ? "on" : "off"}`} d={dValues} /> 
        ))} 
      </svg>
    ) 

  } 

}

export default LightningBolts;