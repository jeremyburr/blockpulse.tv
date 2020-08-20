import React, { Component } from 'react';
import * as d3 from "d3";

class LineChart extends Component {

  componentDidMount() {

    let value = 0;
    let data = [{ value: value, time: Date.now() }];

    const duration = 3750;

    var yValue = 0;

    var margin = { top: 50, right: 50, bottom: 50, left: 50 }
      , width = window.innerWidth - margin.left - margin.right
      , height = window.innerHeight - margin.top - margin.bottom;

    var svg = d3.select('body')
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("class", "svg")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr("class", "translate-container");

    var yScale = d3.scaleLinear()
      .domain([0, 10])
      .range([height, 0]);

    svg.append("g")
      .call(d3.axisLeft(yScale));

    setInterval(function () {

      yValue++;
      data.push({ value: yValue, time: Date.now() });

      console.log('data', data);

    }, 12000)

    var now = Date.now();

    var line = d3.line()
      .x(function (d, i) { return xScale(d.time) })
      //.x(function(d,i) { return xScale((now - (i)) * duration)})
      .y(function (d) { return yScale(d.value) })
      .curve(d3.curveBasis)

    var xScale = d3.scaleTime()
      .range([0, width]);

    var xAxis = d3.axisBottom(xScale);

    var xG = svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(" + 0 + "," + height + ")")
      .call(xAxis);

    setTimeout(function () {

      var lineElement = svg.append("g")
        .append("path")
        .attr("class", "pathline")
        .attr("d", line(data))

    }, 60000);


    d3.timer(function () {

      //lineElement.remove();

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
