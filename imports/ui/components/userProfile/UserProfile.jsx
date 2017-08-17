import React, { Component } from 'react';
import { Grid, Image, Menu, Segment, Card, Icon} from 'semantic-ui-react'

import BasicInfo from './BasicInfo';
// import Interests from './Interests';
import ActivityPreference from './ActivityPreference';
import { UserData } from '../../../api/userData.js';
import { UserImage } from '../../../api/userImage.js';
import UserImageModal from '../SelectImageModal';

var UserDisplayName = "New User";
// var UserDisplayBio = "Add bio";

export default class UserProfile extends Component {
  constructor(){
    super();

    this.state = ({
      activeItem: 'activity preference',
      activeComponents:  <BasicInfo /> 
    });

    this.SaveNewUserProfilePhoto = this.SaveNewUserProfilePhoto.bind(this)
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    switch(name){
      case 'Basic info':
        this.setState({ activeComponents: <BasicInfo />});
        break;
      case 'activity preference':
        this.setState({ activeComponents: <ActivityPreference />});
        break;
   // case 'Interests':
   //   this.setState({ activeComponents: <Interests />});
   //   break;
   // case 'Friends':
   //   this.setState({ activeComponents: <ActivityPreference />});
   //   break;
   // case 'Groups':
   //   this.setState({ activeComponents: <ActivityPreference />});
   //   break;
   // case 'Exact':
   //   this.setState({ activeComponents: <ActivityPreference />});
   //   break;
   // case 'Settings':
   //   this.setState({ activeComponents: <ActivityPreference />});
   //   break;
    }
  }

  componentWillMount(){
    var userData = UserData.findOne({ _id: Meteor.userId() });
    var userImage = '';
    userImage = UserImage.findOne({ _id: Meteor.userId() });

    if (userData != null){
      UserDisplayName = userData.firstName;
      // UserDisplayBio = userData.bio;
    }

    if (userImage){
      this.setState({ UserImage : userImage.profileImage  });
    }
  }

  SaveNewUserProfilePhoto(photo){
    if(photo){
        UserImage.update({_id: Meteor.userId()}, {$set: {profileImage : photo}});
        this.setState({ UserImage : photo });
    }  
  }

  render() {
      const { activeItem } = this.state
      const UserCard = (
        <Card>
          <Image
            height={150} 
            src={this.state.UserImage}
            label={<UserImageModal 
                handleSave={this.SaveNewUserProfilePhoto} 
                currentImage={this.state.UserImage} 
                headerMessage='Select a new profile pictuer' />
            }
          />
          <Card.Content>
            <Card.Header>{UserDisplayName}</Card.Header>
            {/* <Card.Description>{UserDisplayBio}</Card.Description> */}
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              10 Friends
            </a>
          </Card.Content>
        </Card>
        )

    return (
     <Grid>
        <Grid.Column width={3}>
          {UserCard}
          <Menu fluid vertical tabular>
            <Menu.Item name='Basic info' active={activeItem === 'Basic info'} onClick={this.handleItemClick} />
            {/* <Menu.Item name='Interests' active={activeItem === 'Interests'} onClick={this.handleItemClick} /> */}
            <Menu.Item name='activity preference' active={activeItem === 'activity preference'} onClick={this.handleItemClick} />
            {/*<Menu.Item name='Friends' active={activeItem === 'Frriends'} onClick={this.handleItemClick} />
            <Menu.Item name='Groups' active={activeItem === 'Groups'} onClick={this.handleItemClick} />
            <Menu.Item name='Exact' active={activeItem === 'Exact'} onClick={this.handleItemClick} />
            <Menu.Item name='Settings' active={activeItem === 'Settings'} onClick={this.handleItemClick} />*/}
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
            {this.state.activeComponents}
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
};