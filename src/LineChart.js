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
				.attr("class","svg")
			.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
				.attr("class","translate-container"); 

		var xScale = d3.scaleTime()
			.range([0,width]);

		var xAxis = d3.axisBottom(xScale); 

		var xG = svg.append("g") 
				.attr("class","x-axis")
				.attr("transform", "translate(" + 0 + "," + height + ")")
				.call(xAxis); 
		
		d3.timer(function() {
		  var now = Date.now();
			  xScale.domain([now - 10 * 6000, now]);
				xG.call(xAxis);
		});


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
