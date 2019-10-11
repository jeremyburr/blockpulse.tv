import React, { Component } from 'react'; 
import * as d3 from "d3";

var width = window.innerWidth,
	height = window.innerHeight;

var x = d3.scaleLinear()
	.domain([0, 1])
	.range([0, width]);

var y = d3.scaleLinear()
	.domain([0, 1])
	.range([0, height]);

var r = d3.scaleSqrt()
	.domain([0, 1])
	.range([0, 30]);

var events = []; 

class Circles extends Component { 
	
	constructor() {
		super();
		this.myRef = React.createRef();
	}
  
  componentDidMount() { 
		 	
		// Get unconfirmed transactions

    var websocket = this.props.websocket; 
		var svgElement = this.myRef.current;
    websocket.onopen = function(evt) { 
			websocket.send('{"op":"unconfirmed_sub"}'); 
      websocket.onmessage = function(evt) { 
			var dateNow = Date.now();
			events.push({key: dateNow, x: Math.random(), y: Math.random(), r: Math.random()});

			setTimeout(function() { 
				function getDateNow(event) { 
				  return event.key === dateNow;
				}

					var eventIndex = events.findIndex(getDateNow); 
					events.splice(eventIndex,1); 

			},1000);

			console.log('events.length: ',events.length); 

			var svg = d3.select(svgElement).selectAll('circle') 
			.data(events, function(d) { return d.key })

			svg.enter().append('circle')
				.attr('class', 'item')
				.attr('r', function(d) { return 8; })
				.attr('cx', function(d) { return x(d.x); })
				.attr('cy', function(d) { return y(d.y);})
			.transition().duration(1000)
				.style('fill', 'orange')

			svg.exit().filter(':not(.exiting)') // Don't select already exiting nodes
				.classed('exiting', true)
			.transition().duration(1000)
				.remove() 
			
      } 
    }; 
		
  } 

  render() {
    return  (
      <div>
				<svg ref={this.myRef} width={window.innerWidth} height={window.innerHeight} ></svg>
			</div> 
    ) 
  } 
}


export default Circles;
