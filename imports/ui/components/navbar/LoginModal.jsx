import React, { Component } from 'react';
import { Menu, Button, Header, Modal, Divider, Form, Message, Segment } from 'semantic-ui-react';

export default class LogInModal extends Component{
  constructor (){
    super();
    this.state = { LogInError: "" };
  }

  logingIn(event){
    event.preventDefault()
    var emailVar = event.target.UserName.value.trim();
    var passwordVar = event.target.Password.value;

    Meteor.loginWithPassword(emailVar, passwordVar, (err)=>{
        if (err){
          this.setState({ LogInError: err.reason})          
        }
        else{   
          sessionStorage.setItem('isLogedIn', true);
          localStorage.setItem('UserEmail', emailVar)
          this.props.loginUpdate();      
        }
    });
  }
  
  render(){
    return(
      <Modal trigger={<Menu.Item name="LogIn"/>} basic size='small'>
        <Header icon='info circle' content='Login Credentials' />
        <Modal.Content>
          <Segment.Group piled>
            <Segment>
              {this.state.LogInError ? <Message size='mini' color='red'>{this.state.LogInError}</Message>: null}
              
              <Form size='huge' onSubmit={(event)=>this.logingIn(event)}>
                <Form.Group widths='equal'>
                  <Form.Field name="UserName" label='Email' control='input' type="text" placeholder="Username " />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Field name="Password" label='Password' control='input' type="password" placeholder="Password " />
                </Form.Group>
                <Button type='submit' fluid color="green" >Login</Button>
                <Divider hidden />
              </Form>
            </Segment>
          </Segment.Group>
        </Modal.Content>
      </Modal>
    );
  }
}