import React, { Component } from 'react';

import Navbar  from '../components/navbar/Navbar';
import Dashboard  from '../components/EventsList';

export default class MainLayout extends Component {
    render(){
        if(this.props.UserPage == false || sessionStorage.getItem('isLogedIn') == "true"){
            return(
                <div className="container">
                    <div>
                        < Navbar />
                    </div> 
                    <br />               
                    {this.props.containerZ}
                </div>
            );
        }
        else{
            return(
                <div className="container">
                    < Navbar />
                    <h3>access denied!</h3>
                </div>
            );
        }
    }
}

MainLayout.defaultProps = {
    containerZ: <Dashboard />
}