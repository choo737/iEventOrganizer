import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Menu, Button, Header, Icon, Modal, Divider, Form, Message, Segment } from 'semantic-ui-react';

var NavLink = require('react-router-dom').NavLink;

import MainLayout from '../../layouts/MainLayout';
import UserProfile from '../userProfile/UserProfile'
import { UserData } from '../../../api/userData.js';
import { UserActivityPreferenceData } from '../../../api/userActivityPreference.js';
import { UserImage } from '../../../api/userImage.js';

export default class RegisterModal extends Component{
  constructor (){
    super();
    this.state = { 
        RegisterError: "",
        SucceedRegister : false
    };
  }

  RegisterUser(event){
  	event.preventDefault();    
    var emailVar = event.target.UserName.value.trim();
    var passwordVar = event.target.Password.value;
    var confirmPassWord = event.target.ConfirmPassword.value;

    if( emailVar == ""){
        this.setState({ RegisterError: "Please enter an email address" });        
    }
    else if(passwordVar != confirmPassWord){
        this.setState({ RegisterError: "Your passwords do not match" }); 
    }
    else{
        Accounts.createUser({
          email:    emailVar,
          password: passwordVar,
        },  (error)=> {
          if (error) {
        	this.setState({ RegisterError: error.reason }); 
          }
          else{
            sessionStorage.setItem('isLogedIn', true);     
            UserData.insert({
            	_id: Meteor.userId(),
                email: emailVar
            }); 
        
            UserActivityPreferenceData.insert({
            	_id: Meteor.userId(),
            	email: emailVar
            });

            UserImage.insert({
            	_id: Meteor.userId(),
            	profileImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA8AAAAMcCAMAAACo9Dz9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowMEZDRUU0QjREQTIxMUU0ODAwMUVCOTYwMzA5MzE3NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowMEZDRUU0QzREQTIxMUU0ODAwMUVCOTYwMzA5MzE3NSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAwRkNFRTQ5NERBMjExRTQ4MDAxRUI5NjAzMDkzMTc1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAwRkNFRTRBNERBMjExRTQ4MDAxRUI5NjAzMDkzMTc1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+D7rN8gAAAMZQTFRFvL7A5+jpuLm7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'
            });
        
            this.setState({SucceedRegister: true});
          }
        });
    }   
  }
  
  render(){
    if(this.state.SucceedRegister){
		return(
            <Redirect to="/userProfile" />
		);
	}
	else{
    return(
      <Modal trigger={<Menu.Item name="SignUp"/>} basic size='small'>
        <Header icon='info circle' content='Register New Account' />
        <Modal.Content>
          <Segment.Group piled>
            <Segment>
              {this.state.RegisterError ? <Message size='mini' color='red'>{this.state.RegisterError}</Message>: null}
              
              <Form size='huge' onSubmit={(event)=>this.RegisterUser(event)}>
                <Form.Group widths='equal'>
                  <Form.Field name="UserName" label='Email' control='input' type="text" placeholder="Username " />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Field name="Password" label='Password' control='input' type="password" placeholder="Password " />
                  <Form.Field name="ConfirmPassword" label='Confirm Password' control='input' type="password" placeholder="Re-enter your Password " />
                </Form.Group>
                <Button type='submit' fluid color="green" >Register</Button>
                <Divider hidden />
              </Form>
            </Segment>
          </Segment.Group>
        </Modal.Content>
      </Modal>
    );}
  }
}