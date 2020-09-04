import React, { Component } from 'react';
import "./pulsometer.scss";

class PulseDot extends Component  {


  componentDidMount() {
    console.log('mount');
    console.log(this.props.pulse);
  }

  render() {
    return (
      <div className="pulsedot">
        <div className={`dot ${this.props.pulse ? "on" : "off"}`} />
      </div>
    )
  }

}

export default PulseDot;

  
