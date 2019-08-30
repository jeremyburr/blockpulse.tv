import React, { Component } from 'react'; 
import * as d3 from "d3";

var width = 960,
	height = 500;

var x = d3.scaleLinear()
	.domain([0, 1])
	.range([0, width]);

var y = d3.scaleLinear()
	.domain([0, 1])
	.range([150, height - 150]);

var r = d3.scaleSqrt()
	.domain([0, 1])
	.range([0, 30]);

var circlesCreated = 0; 

class Circles extends Component { 
  
	constructor() {
		super();
		this.state = {
			data: [] 
		};
		this.myRef = React.createRef(); 
		this.add = this.add.bind(this);
  	this.remove = this.remove.bind(this);
	}

	add() {
		console.log('add()');
		var data = this.state.data.slice(0);
		data.push({key: Date.now(), x: Math.random(), y: Math.random(), r: Math.random()})
		this.setState ({
			data: data
		})
		setTimeout(this.state.data.length < 100 ? this.add : this.remove, 5);
	}

	remove() {
		console.log('remove()');
		var data = this.state.data.slice(1);
		this.setState ({
			data: data
		})
		setTimeout(this.state.data.length === 100 ? this.remove : this.add, 5);
	}

  componentDidMount() { 

		// Get unconfirmed transactions
    var websocket = this.props.websocket; 
    websocket.onopen = function(evt) { 
			websocket.send('{"op":"unconfirmed_sub"}'); 
      websocket.onmessage = function(evt) { 
        //console.log('evt',evt);
      } 
    }; 

		this.add();
			
  }

	componentDidUpdate() {

		/*console.log('componentDidUpdate()');
		
		var item = d3.select(this.myRef).selectAll('circle'); 

		 item.enter().append('circle')
      .attr('class', 'item')
      .attr('r', function(d) { return r(d.r); })
      .attr('cx', function(d) { return x(d.x); })
      .attr('cy', 0)
      .style('stroke', '#3E6E9C')
    .transition().duration(1000)
      .attr('cy', function(d) { return y(d.y); })
      .style('stroke', '#81E797');

    item.exit().filter(':not(.exiting)') // Don't select already exiting nodes
      .classed('exiting', true)
    .transition().duration(1000)
      .attr('cy', height)
      .style('stroke', '#3E6E9C')
      .remove();
*/
	}

  render() {
    return  (
      <div>
				<svg ref={this.myRef} data={this.state.data} width="400" height="400"></svg>
				Circles Content
			</div> 
    ) 
  } 
}


export default Circles;
