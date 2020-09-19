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
      cue: 0,
      clearCue: false,
      atCapacity: false,
      bolts: initialBolts
    }
  } 

  clearCue = () => { 

    this.setState({clearCue: true});
    
    //console.log('clearCue()');

      let boltCount = 0; 

      const boltInterval = setInterval(()=> {

        for (const bolt of this.state.bolts) { 
          if (Date.now() - bolt.timestamp > 750) { 
            boltCount++;
          } 
        }

        if (boltCount > 0) { 

         //console.log('boltCount: ',boltCount)

          const updatedBolts = this.state.bolts.map(bolt => { 

            if (bolt.position <= boltCount) { 
              bolt.active = true;
            }

            return bolt; 
          })

          //console.log(updatedBolts);

          this.setState({
            bolts:updatedBolts,
            clearCue:false,
            cue:this.state.cue-boltCount
          }) 

          clearInterval(boltInterval);

        }

      },250) 

    } 

    resetBolts = () => {

        const updatedLightningBolts = this.state.bolts.map(bolt => { 
          if (bolt.active && (Date.now() - bolt.timestamp > 750)) { 
            bolt.active = false;
          } 
          return bolt; 
        })

    }
  

  addEvent = () => { 
      
      const inactiveBolt = this.state.bolts.find(bolt => { 
        return bolt.active === false 
      }); 

      if (inactiveBolt !== undefined) { 
               
        const position = inactiveBolt.position; 

        const updatedLightningBolts = this.state.bolts.map(bolt => { 
          if (bolt.position === position) { 
            bolt.active = true; 
            bolt.timestamp = Date.now(); 
          } 
          else if (bolt.active && (Date.now() - bolt.timestamp > 750)) { 
            bolt.active = false;
            bolt.timestamp = Date.now(); 
          } 
          return bolt; 
        }) 

        this.setState({ 
          bolts: updatedLightningBolts,
        }) 
       
    } 

    else {
      this.setState({cue: this.state.cue+1})
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
  }

  componentDidUpdate() { 
    if ( (this.state.cue !== 0) && (this.state.clearCue === false) ) { 
      this.clearCue(); 
      this.resetBolts(); 
      console.log('state cue',this.state.cue);
    } 

  }

  render() { 

    return (
    
      <div className="container-pulsometer">
        <div className="pulsometer">
          <div className="antenna" >
            <div className="bulb" > 
              <LightningBolts bolts={this.state.bolts} /> 
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
