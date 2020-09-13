import React, { Component } from 'react';
import "./pulsometer.scss"; 

class LightningBolt extends Component  {

  componentDidMount() {

    let svg = document.getElementById("svg-lightning-bolt") 

    let path_1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path_1.setAttribute("d", "M 40 5 L 40 25 L 40 25 L 35 25 L 40 50 L 40 30 L 45 30 L 40 5 ");
    path_1.setAttribute("class","bolt-1");
    svg.appendChild(path_1);
    
    let path_2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path_2.setAttribute("d", "M 40 5 L 40 25 L 40 25 L 35 25 L 40 50 L 40 30 L 45 30 L 40 5 ");
    path_2.setAttribute("class","bolt-2");
    svg.appendChild(path_2);
    
    let path_3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path_3.setAttribute("d", "M 40 5 L 40 25 L 40 25 L 35 25 L 40 50 L 40 30 L 45 30 L 40 5 ");
    path_3.setAttribute("class","bolt-3");
    svg.appendChild(path_3);
    
    let path_4 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path_4.setAttribute("d", "M 40 5 L 40 25 L 40 25 L 35 25 L 40 50 L 40 30 L 45 30 L 40 5 ");
    path_4.setAttribute("class","bolt-4");
    svg.appendChild(path_4);

  }

render() { 

  return (
    <svg id="svg-lightning-bolt" viewBox="0 0 400 400" className="lightning-bolt"> 
      <path className="bolt-0" d="M 40 5 L 40 25 L 40 25 L 35 25 L 40 50 L 40 30 L 45 30 L 40 5 "/>
    </svg>
  ) 

}


}

export default LightningBolt;