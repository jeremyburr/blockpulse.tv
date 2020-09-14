import React, { Component } from 'react';
import "./pulsometer.scss"; 

class LightningBolts extends Component  {

  render() { 

    let dValues = "M 40 5 L 40 25 L 40 25 L 35 25 L 40 50 L 40 30 L 45 30 L 40 5" 

    console.log(this.props.bolts)
    return (
      <svg id="svg-lightning-bolt" viewBox="0 0 400 400" className="lightning-bolt"> 
        {this.props.bolts.map(bolt => (
          <path key={bolt.position} className={`bolt-${bolt.position}`} d={dValues} /> 
        ))} 
      </svg>
    ) 

  } 

}

export default LightningBolts;