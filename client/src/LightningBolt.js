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
    
    let path_5 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path_5.setAttribute("d", "M 40 5 L 40 25 L 40 25 L 35 25 L 40 50 L 40 30 L 45 30 L 40 5 ");
    path_5.setAttribute("class","bolt-5");
    svg.appendChild(path_5);
    
    let path_6 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path_6.setAttribute("d", "M 40 5 L 40 25 L 40 25 L 35 25 L 40 50 L 40 30 L 45 30 L 40 5 ");
    path_6.setAttribute("class","bolt-6");
    svg.appendChild(path_6);
    
    let path_7 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path_7.setAttribute("d", "M 40 5 L 40 25 L 40 25 L 35 25 L 40 50 L 40 30 L 45 30 L 40 5 ");
    path_7.setAttribute("class","bolt-7");
    svg.appendChild(path_7);
    
    let path_8 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path_8.setAttribute("d", "M 40 5 L 40 25 L 40 25 L 35 25 L 40 50 L 40 30 L 45 30 L 40 5 ");
    path_8.setAttribute("class","bolt-8");
    svg.appendChild(path_8);
    
    let path_9 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path_9.setAttribute("d", "M 40 5 L 40 25 L 40 25 L 35 25 L 40 50 L 40 30 L 45 30 L 40 5 ");
    path_9.setAttribute("class","bolt-9");
    svg.appendChild(path_9);
    
    let path_10 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path_10.setAttribute("d", "M 40 5 L 40 25 L 40 25 L 35 25 L 40 50 L 40 30 L 45 30 L 40 5 ");
    path_10.setAttribute("class","bolt-10");
    svg.appendChild(path_10);

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