import React, { Component } from 'react';
import "./pulsometer.scss"; 

class LightningBolts extends Component  {

  render() { 

    let dValues = "M 40 5 L 40 25 L 40 25 L 35 25 L 40 50 L 40 30 L 45 30 L 40 5" 
    let viewBox = "0 0 400 400";

    //console.log(this.props.bolts)

    return (
      <svg id="svg-lightning-bolt" viewBox={viewBox} className="lightning-bolt"> 
        {this.props.bolts.map((bolt,index) => (
          <path key={index} className={`bolt bolt-${bolt.position} ${bolt.active ? "on" : "off"}`} d={dValues} /> 
        ))} 
      </svg>
    ) 

  } 

}

export default LightningBolts;