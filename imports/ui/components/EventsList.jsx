import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { List } from 'semantic-ui-react'

import Event from './Event.jsx';
import { Events } from '../../api/events.js';
 
class EventsList extends Component { 
  renderEvents() {
    return this.props.events2.map((event) => (
      <Event key={event._id} event={event} />
    ));
  }
  render(){
    return(
      <div>
        <h1>Events List:</h1>
        <List relaxed>
          {this.renderEvents()}
        </List>
      </div>
    );
  }
}
EventsList.PropTypes = {
    events: PropTypes.array.isRequired,
};
export default createContainer(() => {
    return {
        events2: Events.find({}).fetch(),
    };    
}, EventsList);