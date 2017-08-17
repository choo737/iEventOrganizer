import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';

export default class ErrorMessage extends Component {
  render(){
    return(
      <Message color='red' id="errorMessage"> Red </Message>      
    )
  }
};