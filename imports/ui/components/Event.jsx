import React, { Component } from 'react';
import PropTypes from 'prop-types';

var dateFormat = require('dateformat');

import {EventListView, EventDetailedView} from './EventViews'

export default class Event extends Component {  
  render() {
    return (
      <EventListView event={this.props.event} />
    );
  }
}
 
Event.propTypes = {
  // This component gets the event to display through a React prop.
  // We can use propTypes to indicate it is required
  event: PropTypes.object.isRequired,
};




