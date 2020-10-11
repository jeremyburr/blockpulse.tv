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
  
  getBoltsActive = () => { 
    let boltsActive = 0; 
    for (const bolt of this.state.bolts) { 
      if (bolt.active) boltsActive++ 
    } 
    return boltsActive;
  } 

  clearCue = () => { 

    console.log('clearCue()'); 

    const clearingCue = setInterval(()=>{

      console.log('clearingCue()',this.state.cue,' bolts'); 

      let clearLoop = false;

      const activeBolts = this.getBoltsActive(); 
      let boltsToClear = this.state.bolts.length - this.getBoltsActive(); 

      console.log('activeBolts',activeBolts)

      //console.log('boltstoclear',typeof(boltsToClear));
      //console.log('this.getBoltsActive()',typeof(this.getBoltsActive()));

      if (this.state.cue < activeBolts) {
        boltsToClear -= this.state.cue;
        clearLoop = true;
      }

      //console.log('boltsToClear',boltsToClear);

      this.setState({
        bolts:this.state.bolts.map(bolt=>{
          if (this.state.bolts.indexOf(bolt) < boltsToClear) {
            bolt.active = true;
          } 
          return bolt; 
        }),
        cue: this.state.cue - boltsToClear,
        clearingCue: clearLoop ? true : false
      })

      //console.log('state cue',this.state.cue); 

      /*const remainder = this.state.cue - this.getBoltsActive(); 

      //if (this.state.cue = 0) return;

      if (remainder <0 )  { 
          this.setState({
            clearingCue: false
          }) 
        clearInterval(clearLoop) 
        console.log('clearedTheLoop');
        return; 
      } else if (remainder > this.state.bolts.length) { 
        console.log('clearing');
        this.setState({
          bolts:this.state.bolts.map(bolt=>{
            bolt.active = true;
            return bolt; 
          })
        }) 
      } else {
        console.log('clearing');
        this.setState({
          bolts:this.state.bolts.map(bolt=>{
            if (this.state.bolts.indexOf(bolt) <= remainder) {
              bolt.active = true;
            }
            return bolt; 
          })
        }) 
      }*/ 

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