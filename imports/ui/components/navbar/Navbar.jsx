import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

var NavLink = require('react-router-dom').NavLink;

import { UserMenu , VisitorsMenu, UserAcount } from './Menus';
import LogInModal from './LoginModal';
import RegisterModal from './RegisterModal';
 
export default class Navbar extends Component {
  constructor (){
    super();
    if(sessionStorage.getItem('isLogedIn') == "true"){
        this.state = {isLogedIn: true};
    }else{
        this.state = {isLogedIn: false};
    }
    this.userIsLoggedIn = this.userIsLoggedIn.bind(this)
  }

  userIsLoggedIn(){
    this.setState({isLogedIn: true}); 
  }

  logOut(){
    sessionStorage.setItem('isLogedIn', false);
    localStorage.removeItem('UserEmail');
    this.setState({isLogedIn: false});    
  }

  render() {
    return(
      <Menu inverted>
        {this.state.isLogedIn? <UserMenu /> : <VisitorsMenu /> }

        <Menu.Menu position='right'>
          {this.state.isLogedIn? <UserAcount logoutFunction={this.logOut} /> : <LogInMenu loginUpdate={this.userIsLoggedIn} /> }
        </Menu.Menu>
      </Menu>
    );
  }
};


class LogInMenu extends Component {
  render(){
    return(
      <Menu inverted>
        <RegisterModal />

        <LogInModal loginUpdate={this.props.loginUpdate} />
      </Menu>
    );
  }
}
