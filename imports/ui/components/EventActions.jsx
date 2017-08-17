import React, { Component } from 'react';
import { Icon, Button } from 'semantic-ui-react'

import { Events } from '../../api/events.js';


export class RemoveEventButton extends Component {

  removeEvent(id){
    Events.remove(id);
  }

  render() {
    return (
      <Button 
        size={"large"} 
        color='red'
        onClick={() => this.removeEvent(this.props.eventId)}> 
        <Icon name='trash outline' size='large' />
        Delete this event 
      </Button>
    )
  }
}

