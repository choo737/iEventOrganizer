import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor'
import { Button, Form, Container, Icon, Menu, Dropdown, Radio, Popup } from 'semantic-ui-react';

import { UserData } from '../../../api/userData.js';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';

var UserBasicInfo = {
  firstName : "",
  lastName : "",
  Email : "",
  EmailPrivacy : "",
  PhoneNumber : "",
  PhonePrivacy : "",
  Sex : "",
  AgeGroup : ""
}
 
export default class BasicInfo extends Component {
  constructor (){
    super();
    this.state = {
      Sex: "",
      AgeGroup: "",
      ActionMessage: "" ,
      EmailPrivacy : "",
      PhonePrivacy : ""
    };
  }

  componentWillMount(){
    var userData = UserData.findOne({ _id: Meteor.userId() });
    
    if (userData != null){
      UserBasicInfo.firstName = userData.firstName;
      UserBasicInfo.lastName = userData.lastName;
      UserBasicInfo.Email = userData.email;
      UserBasicInfo.EmailPrivacy = userData.emailPrivacy;
      UserBasicInfo.PhoneNumber = userData.phone;
      UserBasicInfo.PhonePrivacy = userData.phonePrivacy;
      UserBasicInfo.Sex = userData.sex;
      UserBasicInfo.AgeGroup = userData.ageGroup;
    }

    this.setState({
      Sex : UserBasicInfo.Sex,
      AgeGroup : UserBasicInfo.AgeGroup,
      EmailPrivacy : UserBasicInfo.EmailPrivacy,
      PhonePrivacy : UserBasicInfo.PhonePrivacy
    });
  }

  SaveUserData(e){
    e.preventDefault();

    UserData.update({_id: Meteor.userId()}, {
      $set:{
        firstName: this.refs.firstName.value,
        lastName: this.refs.lastName.value,
        emailPrivacy: this.state.EmailPrivacy,
        phone: this.refs.phone.value,
        phonePrivacy: this.state.PhonePrivacy,
        sex: this.state.Sex,
        ageGroup: this.state.AgeGroup
      }
    }, (error) =>{
      if(error){
        this.setState({ActionMessage: <ErrorMessage />});
      }
      else{
        this.setState({ActionMessage: <SuccessMessage />});
      }
    });
  }  

  handleChange = (e, { value }) => this.setState({ Sex: value })

  handleEmailPrivacy = (e, { value }) => this.setState({ EmailPrivacy : value })

  handlePhonePrivacy= (e, { value }) => this.setState({ PhonePrivacy : value })

  UpdateAgeGoup = (e, { value }) => this.setState({ AgeGroup: value })

  SelectSex(e){
    this.props.Sex.value = e.value;
  }

  render() {
    const AgeGroups = [
      { key: 1, text: '18-23', value: 1 },
      { key: 2, text: '24-31', value: 2 },
      { key: 3, text: '32-39', value: 3 },
      { key: 4, text: '40-50', value: 4 },
      { key: 5, text: '50 +', value: 5 },
    ]

    return (
        <Container text>
          <Form>
            {this.state.ActionMessage}
            <Form.Field width="9">
              <label>First Name</label>
              <input className="UserInfo" defaultValue={UserBasicInfo.firstName} type="text" ref="firstName" placeholder='First Name' />
            </Form.Field>
            <Form.Field width="9">
              <label>Last Name</label>
              <input className="UserInfo" defaultValue={UserBasicInfo.lastName} type="text" ref="lastName" placeholder='Last Name' />
            </Form.Field>
            <Form.Field width="9">
              <label>Email  <Icon name='mail' size='small' /></label>
              <Popup
                trigger={<input readOnly id="UserEmail" className="UserInfo" defaultValue={UserBasicInfo.Email} />}
                content='Email can not be changed!'
                position='right center'
                on='click'
                hideOnScroll
              />
              <Icon name='globe' size='large' />
              <Radio
                label='Public &nbsp;'                
                name='emailPrivacyGroup'
                value='Public'
                checked={this.state.EmailPrivacy === 'Public'}
                onChange={this.handleEmailPrivacy}
              />
              <span> |  </span>
              <Icon name='protect' size='large' />
              <Radio
                label='Private'                
                name='emailPrivacyGroup'
                value='Private'
                checked={this.state.EmailPrivacy === 'Private'}
                onChange={this.handleEmailPrivacy}
              />
            </Form.Field>
            <Form.Field width="9">
              <label><Icon name='mobile' size='large' /> Phone</label>
              <input className="UserInfo" defaultValue={UserBasicInfo.PhoneNumber} type="tel" ref="phone" placeholder='Phone number' />
              <Icon name='globe' size='large' />
              <Radio
                label='Public &nbsp;'
                name='phonePrivacyGroup'
                value='Public'
                checked={this.state.PhonePrivacy === 'Public'}
                onChange={this.handlePhonePrivacy}
              />
              <span> |  </span>
              <Icon name='protect' size='large' />
              <Radio
                label='Private'                
                name='phonePrivacyGroup'
                value='Private'
                checked={this.state.PhonePrivacy === 'Private'}
                onChange={this.handlePhonePrivacy}
              />
            </Form.Field>
            <br />
            <Form.Field width="9">
              <label>Sex</label>
                <Form.Field>
                  <Icon name='female' size='large' />
                  <Radio
                    label='Female'
                    name='radioGroup'
                    value='Female'
                    checked={this.state.Sex === 'Female'}
                    onChange={this.handleChange}
                  />
                  <span> | </span>
                  <Icon name='male' size='large' />
                  <Radio
                    label='Male'
                    name='radioGroup'
                    value='Male'
                    checked={this.state.Sex === 'Male'}
                    onChange={this.handleChange}
                  />
                </Form.Field>
            </Form.Field>
            <Form.Field width="9">
              <label>Age Group</label>
              <Menu compact>
                <Dropdown upward search selection 
                id="ageGroup"
                placeholder='select your age group'
                options={AgeGroups}
                value={this.state.AgeGroup}
                onChange={this.UpdateAgeGoup} />
              </Menu>              
            </Form.Field>
              <Button.Group floated='right' >
                <Button>Cancel</Button>
                <Button.Or />
                <Button positive onClick={(e) => this.SaveUserData(e)}>Save</Button>
              </Button.Group>
          </Form>
        </Container>   
    );
  }
};