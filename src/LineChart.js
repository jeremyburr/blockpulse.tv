import React, { Component } from 'react'; 
import * as d3 from "d3";

class LineChart extends Component {

	componentDidMount() { 

		var data = [0,1,2,3,4,5,6,7,8,9];

		var margin = {top: 50, right: 50, bottom: 50, left: 50}
		, width = window.innerWidth - margin.left - margin.right 
    , height = window.innerHeight - margin.top - margin.bottom; 

		var xScale = d3.scaleLinear()
			.domain([0,9])
			.range([0,width]);

		var yScale = d3.scaleLinear()
			.domain([0,10])
			.range([height,0]);

		var line = d3.line()
			.x(function(d){return xScale(d)})
			.y(function(d){return yScale(d)})

		var svg = d3.select('body')
			.append("svg") 
				.attr("width",width + margin.left + margin.right)
				.attr("height",height + margin.top + margin.bottom) 
			.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

		svg.append("g")
			.call(d3.axisBottom(xScale))
			.attr("transform", "translate(" + 0 + "," + height + ")");

		svg.append("g")
			.call(d3.axisLeft(yScale)); 

		svg.append("path")
			.attr("d",line(data)); 

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
