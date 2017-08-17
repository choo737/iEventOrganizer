import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'semantic-ui-react';

var NavLink = require('react-router-dom').NavLink;

export class UserMenu extends Component {
  render(){
    return(
      <Menu inverted>
        <Menu.Item as={NavLink} to="/home"> <Icon name='home' size='large' /> </Menu.Item>
        <Menu.Item as={NavLink} name='Dashboard' to="/dashboard" />        
        <Menu.Item as={NavLink} name='eventEntry' to="/eventEntry" />
      </Menu>
    );
  }
}

export class VisitorsMenu extends Component {
  render(){
    return(
      <Menu inverted>
        <Menu.Item as={NavLink} name='Home' to="/home" />
        <Menu.Item as={NavLink} name='About us' to="/AboutUs" />
      </Menu>
    );
  }
}

export class UserAcount extends Component {
  logOut(){
    this.props.logoutFunction();   
  }

  render(){
    return(
      <Dropdown text='Account' pointing className='link item'>
        <Dropdown.Menu>
          <Dropdown.Item as={NavLink} name='Profile' to="/userProfile">
            <Icon name='user' size='large' />
            Profile
          </Dropdown.Item>

          <Dropdown.Divider />

          <Dropdown.Item as={NavLink} name='logOut' to="/logOut" onClick={()=>this.logOut()}>
            <Icon name='log out' size='large' />
            logOut
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}