import React, { Component } from 'react'; 
import * as d3 from "d3";

class LineChart extends Component {

	componentDidMount() { 

    const duration = 3750;
		let start = 0;
		let end = 1;

		var margin = {top: 50, right: 50, bottom: 50, left: 50}
		, width = window.innerWidth - margin.left - margin.right 
    , height = window.innerHeight - margin.top - margin.bottom; 

		var svg = d3.select('body')
			.append("svg") 
				.attr("width",width + margin.left + margin.right)
				.attr("height",height + margin.top + margin.bottom) 
			.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

		var xScale = d3.scaleLinear()
			.domain([start,end])
			.range([0,width]); 

		var axisX = svg.append("g") 
			//.attr("fill-opacity","1") 
		
		axisX
			.attr("transform", "translate(" + 0 + "," + height + ")")
			.call(xScale.axis = d3.axisBottom(xScale));


		var transition = d3.transition()
    .duration(duration)
    .ease(d3.easeLinear); 

    (function tick()  { 

			start++;
			end++; 

			transition = transition.each(function() {

			xScale.domain([start,end]) 

			axisX
				.transition()
				.duration(duration)
				.ease(d3.easeLinear)
				.call(xScale.axis);

      }).transition().on('start',tick); 

    })(); 

	 }

  render() { 
    return ( 
			<div>
				Line Chart
			</div>
    ) 
  }

}

export default LineChart;
