import React, { Component } from 'react'; 
import * as d3 from "d3";

var width = 400,
	height = 400;

var x = d3.scaleLinear()
	.domain([0, 1])
	.range([0, width]);

var y = d3.scaleLinear()
	.domain([0, 1])
	.range([150, height - 150]);

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
					console.log('event.key',event.key);
					console.log('dateNow',dateNow);
					console.log(event.key === dateNow);
				  return event.key === dateNow;
				}

					var eventIndex = events.findIndex(getDateNow);

					console.log('eventIndex',eventIndex);

					events.splice(eventIndex,1);


			},1000);

			console.log('events.length: ',events.length); 

			var svg = d3.select(svgElement).selectAll('circle') 
			.data(events, function(d) { return d.key });

			svg.enter().append('circle')
				.attr('class', 'item')
				.attr('r', function(d) { return 4; })
				.attr('cx', function(d) { return x(d.x); })
				.attr('cy', function(d) { return y(d.y);})
				.style('stroke', '#3E6E9C')
			.transition().duration(1000)
				//.attr('cy', function(d) { return y(d.y); })
				.style('stroke', 'orange');

			svg.exit().filter(':not(.exiting)') // Don't select already exiting nodes
				.classed('exiting', true)
			.transition().duration(1000)
				//.attr('opacity', 0)
				.style('stroke', 'blue')
				.remove()

			
      } 
    }; 
		
  } 

  render() {
    return  (
      <div>
				<svg ref={this.myRef} width="960" height="500"></svg>
			</div> 
    ) 
  } 
}


export default Circles;
