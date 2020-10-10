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
      cue: 0,
      clearingCue: false,
      bolts: bolts 
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
  
  getBoltsActive = () => { 
    let boltsActive = 0; 
    for (const bolt of this.state.bolts) { 
      if (bolt.active) boltsActive++ 
    } 
    return boltsActive;
  } 

  clearCue = () => { 

    console.log('clearCue()');

    let activeBolts = this.getBoltsActive(); 
    //console.log('activeBolts',activeBolts);

    if (clearLoop) return;
    
    clearLoop = setInterval(()=>{

      const cue =  this.state.cue; 

      const remainder = cue > this.state.bolts.length; 

      if (remainder <=0 )  { 
          this.setState({
            clearCue: false
          }) 
        clearInterval(clearLoop) 
        return; 

      } /*else if (remainder > this.state.bolts.length) { 
        this.setState({
          bolts:this.state.bolts.map(bolt=>{
            bolt.active = true;
            return bolt; 
          })
        }) 
      } else {
        this.setState({
          bolts:this.state.bolts.map(bolt=>{
            if (this.state.bolts.indexOf(bolt) <= remainder) {
              bolt.active = true;
            }
            return bolt; 
          })
        }) 
      } */

    },750) 

  } 

  incrementCue = () => { 
    this.setState({cue:this.state.cue+1}) 
  } 

  sendBolt = () => { 
    const boltsActive = this.getBoltsActive();
    this.setState({ 
      bolts:this.state.bolts.map(bolt => { 
        if (this.state.bolts.indexOf(bolt) === boltsActive) { 
          bolt.active = true; 
          bolt.timestamp = Date.now(); 
        } 
        return bolt; 
      })
    })
  } 

  atCapacity = () => this.state.bolts.length === this.getBoltsActive(); 

  socketEvent = () => { 
    // Add clearCue state property for edge case when capacity indicator is false during a cue clearing 
    //console.log('getBoltsActive()',this.getBoltsActive()); 
    let atCapacity = this.atCapacity(); 

    if ((atCapacity) || (this.state.clearingCue)) { 
      //console.log('at capacity');
      this.incrementCue(); 
    } 
    else if (!atCapacity) { 
      this.sendBolt(); 
      //console.log('not capacity');
    } 
     
  } 

  componentDidMount() {
    this.configureWebSocket();
  }

  // Optimization inside shouldComponentUpdate?

  componentDidUpdate() { 
    console.log('state cue',this.state.cue); 
    if ((this.state.cue > 0) && (!this.state.clearingCue)) 
      this.setState({clearingCue: true})
    else if (this.state.clearingCue) this.clearCue();  
  }

  resetBolt = (boltIndex) => { 
    //console.log("animation end");
    //console.log("boltIndex: ",boltIndex); 
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