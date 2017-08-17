import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'


import MainLayout from '../imports/ui/layouts/MainLayout';
import EventsList from '../imports/ui/components/EventsList';
import AboutUs from '../imports/ui/components/AboutUs';
import EventEntry  from '../imports/ui/components/EventEntry';
import UserProfile from '../imports/ui/components//userProfile/UserProfile';
import WelcomePage from '../imports/ui/components/WelcomePage';
import LogOut from '../imports/ui/components/logOut';
 

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/dashboard" render={() => <MainLayout containerZ={<EventsList />} />} />
            <Route path="/aboutUs" render={() => <MainLayout containerZ={<AboutUs />} UserPage={false} />} />
            <Route path="/eventEntry" render={() => <MainLayout containerZ={<EventEntry />} />} />
            <Route path="/userProfile" render={()=> <MainLayout containerZ={<UserProfile />} />} />
            <Route exact path="/home" render={() => <MainLayout containerZ={<WelcomePage />} UserPage={false} />} />
            <Route exact path="/" render={() => <MainLayout containerZ={<WelcomePage />} UserPage={false} />} />
            <Route exact path="/logOut" render={() => <MainLayout containerZ={<LogOut />} UserPage={false} />} />
        </div>
    </Router>,
    document.getElementById('render-me')
);