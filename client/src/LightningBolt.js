import React, { Component } from 'react';
import "./pulsometer.scss"; 

class LightningBolt extends Component  {

  componentDidMount() {

    let svg = document.getElementById("svg-lightning-bolt") 
    let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    console.log('path is',path);
    path.setAttribute("d", "M 40 5 L 40 25 L 40 25 L 35 25 L 40 50 L 40 30 L 45 30 L 40 5 ");
    path.setAttribute("class","bolt-1");
    console.log('svg:',svg)
    svg.appendChild(path);

  }

render() { 

  return (
    <svg id="svg-lightning-bolt" viewBox="0 0 300 300" className="lightning-bolt"> 
      <path className="bolt-0" d="M 40 5 L 40 25 L 40 25 L 35 25 L 40 50 L 40 30 L 45 30 L 40 5 "/>
    </svg>
  ) 

}


}

export default LightningBolt;