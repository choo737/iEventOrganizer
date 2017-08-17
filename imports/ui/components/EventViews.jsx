import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment, Image, Grid, Container, Header, Icon, Modal, Button } from 'semantic-ui-react'

import { RemoveEventButton } from './EventActions';
var dateFormat = require('dateformat');

export class EventListView extends Component {  
  render() {
    return (
      <Segment style={{ color : 'black', fontFamily: 'Times'}}>
        <Grid divided='vertically' style={{paddingLeft: '30px'}}>
          <Grid.Row columns={2}>
          <Grid.Column width={3}>
            <Grid.Row>
              <Image centered src={this.props.event.image} size='small'/>
            </Grid.Row>
            <Segment>
              <Grid.Row>
                <Header as='h3' style={{ textAlign: 'center' }}>
                  <Icon name='calendar' size='tiny' />
                  {dateFormat(this.props.event.date, "dddd, mmmm dS")}                    
                </Header>              
              </Grid.Row>
              <br />
              <Grid.Row>
                <Header as='h5' style={{paddingLeft : '15px'}}>
                  <Icon name='time' size='large' />
                  {this.props.event.time}                    
                </Header>              
              </Grid.Row>
              <Grid.Row>
                <Header as='h5' style={{paddingLeft : '15px', paddingTop : '5px'}}>
                  <span>
                    <Icon name='marker' size='large'/>
                    <Container style={{paddingLeft: '35px', marginTop : '-19px'}} >
                      {this.props.event.venue}
                    </Container>
                  </span>                   
                </Header>              
              </Grid.Row>
            </Segment>
            </Grid.Column>
            <Grid.Column width={7}>
                <Modal size='large' trigger={<Button floated='right' circular size={"tiny"} icon='info circle' />} basic>
                    <EventDetailedView event={this.props.event} />        
                </Modal>
                <Header as='h2'style={{ fontSize: '175%', paddingTop : '20px'}}>
                    {this.props.event.title}                    
                </Header> 
                <Grid.Row>
                    <Container fluid style={{color : 'black', paddingTop : '10px'}} >
                      {this.props.event.description}
                    </Container>
                </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>          
      </Segment>
    );
  }
}

export class EventDetailedView extends Component {
  render(){
    return(
      <Segment style={{ color : 'black', fontFamily: 'Times'}}>
        <Grid divided='vertically' style={{paddingLeft: '30px'}}>
          <Grid.Row columns={2}>
          <Grid.Column width={5}>
            <Grid.Row>
              <Image centered src={this.props.event.image} size='large'/>
            </Grid.Row>
            <Segment textAlign='center'>
              <Grid.Row>
                <Header as='h1'>
                  <Icon name='calendar' size='tiny' />
                  {dateFormat(this.props.event.date, "dddd, mmmm dS")}                    
                </Header>              
              </Grid.Row>
              <br />
              <br />
              <Grid.Row>
                <Header as='h3'>
                  <Icon name='time' size='large' />
                  {this.props.event.time}                    
                </Header>              
              </Grid.Row>
              <br />
              <Grid.Row>
                <Header as='h3'>
                  <Icon name='marker' size='large' />
                  {this.props.event.venue}                    
                </Header>              
              </Grid.Row>
            </Segment>
          </Grid.Column>
          <Grid.Column width={11}>
            <Header as='h1'style={{ fontSize: '300%', paddingTop : '20px'}}>
                  {this.props.event.title}                    
                </Header> 
            <Grid.Row>
              <Container fluid style={{color : 'black', paddingTop : '10px', textAlign: 'left'}} >
                {this.props.event.description}
              </Container>
            </Grid.Row>
            <br /> <br /> <br /> <br />
            <Grid.Row>
                <Button.Group floated='right'>
                    <RemoveEventButton eventId={this.props.event._id}/>
                </Button.Group>    
            </Grid.Row>
          </Grid.Column>
          </Grid.Row>
        </Grid>          
      </Segment>
    );
  }
}


/*
--Old View

<Grid>
  <Grid.Column textAlign={"center"} width={3}>
      <Grid.Row>
        <Image centered src={this.props.event.image} size='small'/>
      </Grid.Row>
      <Grid.Row>
        // Date
        <h2>{this.props.event.date}</h2>
      </Grid.Row>
      <Grid.Row>
        // Time
        <span>{this.props.event.time}</span>
      </Grid.Row>
      <Grid.Row>
        // venue + map
        <span>{this.props.event.venue}</span>
      </Grid.Row>
  </Grid.Column>      
  <Grid.Column width={5}>
    <Container fluid>
      <Header as='h2'>{this.props.event.title}</Header>
      {this.props.event.description}
    </Container>
  </Grid.Column>
  <Grid.Column width={1}>
    <RemoveEventButton remove={this.removeEvent} eventId={this.props.event._id} />
    <OpenEventCardModal event={this.props.event} />
  </Grid.Column>
</Grid>
*/