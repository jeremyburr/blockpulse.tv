import React, { Component } from 'react';

let isActive = false;

class Pulsometer extends Component  {

  componentDidMount() { 

    var websocket = this.props.websocket;

    websocket.onopen = function(evt) {

      websocket.onmessage = function(evt) {

        console.log(evt.data);

        isActive 

      }

    }

  }

  render() {

    const dotStyles = {

        height: "25px",
        width: "25px",
        backgroundColor: "#bbb",
        borderRadius: "50%",
        display: "inline-block" 

    }


    return (
      <div>
        <div>Pulsometer</div>
        <br />
        <div className={isActive ? "on" : "off"} style={dotStyles} />
      </div>
    )
  }

}

export default Pulsometer;
