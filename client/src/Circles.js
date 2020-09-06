import React, { Component } from 'react';
import * as d3 from "d3";
//const bitcoinjs = require("bitcoinjs-lib");

var width = window.innerWidth,
  height = window.innerHeight;

var x = d3.scaleLinear()
  .domain([0, 1])
  .range([0, width]);

var y = d3.scaleLinear()
  .domain([0, 1])
  .range([0, height]);

var events = [];

class Circles extends Component {

  constructor() {
    super();
    this.myRef = React.createRef();
  }

  componentDidMount() {

    function reRender() {

      //console.log('events:',events); 

      var svg = d3.select(svgElement).selectAll('circle')
        .data(events, function (d) {

          //console.log('d',d);
          //console.log('events:',events);

          return d.key

        })

      svg.enter().append('circle')
        .attr('class', 'item')
        .attr('r', function (d) {
          console.log('d.r', d.r);
          return d.r;
        })
        .attr('cx', function (d) { return x(d.x); })
        .attr('cy', function (d) { return y(d.y); })
        .style('fill', 'orange')

      svg.exit().filter(':not(.exiting)') // Don't select already exiting nodes
        .classed('exiting', true)
        .transition().duration(500)
        .style('opacity', 0)
        .remove()

    }

    // Get unconfirmed transactions

    var websocket = this.props.websocket;
    var svgElement = this.myRef.current;

    websocket.onopen = function (evt) {

      websocket.onmessage = function (evt) {
        var info = JSON.parse(evt.data);

        var valueSum = 0;

        for (var valueObj of info.outs) {
          valueSum += valueObj.value;
        };

        console.log(evt.data);
        //console.log('valueSum', valueSum);

        function getDateNow(event) {
          return event.key === dateNow;
        }

        var dateNow = Date.now();

        events.push({ key: dateNow, x: Math.random(), y: Math.random(), r: valueSum / 10000000 }); 

        reRender();

        var eventIndex = events.findIndex(getDateNow);
        events.splice(eventIndex, 1);

        reRender();

      }
    };

  }

  render() {
    return (
      <div>
        <svg ref={this.myRef} width={window.innerWidth} height={window.innerHeight} ></svg>
      </div>
    )
  }
}


export default Circles;



