import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';
 
export default class SuccessMessage extends Component {
  render(){
    return(
      <Message color='green' id="successMessage"> Green </Message>      
    )
  }
};