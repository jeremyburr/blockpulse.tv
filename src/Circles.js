import React, { Component } from 'react'; 

class Circles extends Component {

  componentDidMount() { 

    console.log('component did mount'); 

    var websocket = this.props.websocket; 
    
    websocket.onopen = function(evt) { 
      console.log('websocket open event'); 

    websocket.send('{"op":"unconfirmed_sub"}');
      
      websocket.onmessage = function(evt) { 
        console.log('evt',evt);
      }

    };

  }

  render() {
    return  (
      <div>Circles Content</div> 
    ) 
  } 
}


export default Circles;
