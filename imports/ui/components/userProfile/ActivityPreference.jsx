import React, { Component } from 'react';
import { Segment, Checkbox, Form, Radio, Button, TextArea } from 'semantic-ui-react';

import { UserActivityPreferenceData } from '../../../api/userActivityPreference.js';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';

var UserActivityPreference = {
  VenueOutdoor : false,
  OutdoorOption : "",
  VenueIndoor : false,
  IndoorOption : "",
  Weekdays : false, 
  Weekends : false, 
  Mornings : false, 
  LunchHours : false,
  Evenings : false, 
  OtherPreferences : "",
  PhysicalActivity : false,
  PhysicalOption : "",
  SmallGroupSize : false,
  LargeGroupSize : false,
  BringFamily : false
}
 
export default class ActivityPreference extends Component {
  constructor (){
    super();
    this.state = {
      ActionMessage: ""
    };
  }

  componentWillMount(){
    var userData = UserActivityPreferenceData.findOne({ _id: Meteor.userId() });

    if (userData != null){
      UserActivityPreference.VenueOutdoor = userData.VenueOutdoor,
      UserActivityPreference.OutdoorOption = userData.OutdoorOption,
      UserActivityPreference.VenueIndoor = userData.VenueIndoor,
      UserActivityPreference.IndoorOption = userData.IndoorOption,
      UserActivityPreference.Weekdays = userData.Weekdays ,
      UserActivityPreference.Weekends = userData.Weekends ,
      UserActivityPreference.Mornings = userData.Mornings ,
      UserActivityPreference.LunchHours = userData.LunchHours,
      UserActivityPreference.Evenings = userData.Evenings ,
      UserActivityPreference.OtherPreferences= userData.OtherPreferences,
      UserActivityPreference.PhysicalActivity = userData.PhysicalActivity,
      UserActivityPreference.PhysicalOption = userData.PhysicalOption,
      UserActivityPreference.SmallGroupSize = userData.SmallGroupSize,
      UserActivityPreference.LargeGroupSize = userData.LargeGroupSize,
      UserActivityPreference.BringFamily = userData.BringFamily
    }
  }

  handleControlChange(event, data){
    switch(data.id){
      case 'VenueOutdoor' :
        this.setState({VenueOutdoor : data.checked});
        UserActivityPreference.VenueOutdoor = data.checked;
        break;
      case 'VenueIndoor' :
        this.setState({VenueIndoor : data.checked});
        UserActivityPreference.VenueIndoor = data.checked;
        break;
      case 'Weekdays' :
        this.setState({Weekdays : data.checked});
        UserActivityPreference.Weekdays = data.checked;
        break;
      case 'Weekends' :
        this.setState({Weekends : data.checked});
        UserActivityPreference.Weekends = data.checked;
        break;
      case 'Mornings' :
        this.setState({Mornings : data.checked});
        UserActivityPreference.Mornings = data.checked;
        break;
      case 'LunchHours' :
        this.setState({LunchHours : data.checked});
        UserActivityPreference.LunchHours = data.checked;
        break;
      case 'Evenings' :
        this.setState({Evenings : data.checked});
        UserActivityPreference.Evenings = data.checked;
        break;
      case 'OtherPreferences' :
        this.setState({OtherPreferences : data.value});
        UserActivityPreference.OtherPreferences = data.value;
        break;
      case 'PhysicalActivity' :
        this.setState({PhysicalActivity : data.checked});
        UserActivityPreference.PhysicalActivity = data.checked;
        break;
      case 'SmallGroupSize' :
        this.setState({SmallGroupSize : data.checked});
        UserActivityPreference.SmallGroupSize = data.checked;
        break;
      case 'LargeGroupSize' :
        this.setState({LargeGroupSize : data.checked});
        UserActivityPreference.LargeGroupSize = data.checked;
        break;
      case 'BringFamily' :
        this.setState({BringFamily : data.checked});
        UserActivityPreference.BringFamily = data.checked;
        break;   
    }
  }

  SaveUserData(e){
    e.preventDefault();
    
    UserActivityPreferenceData.update({_id: Meteor.userId()}, {
      $set:{
        VenueOutdoor : UserActivityPreference.VenueOutdoor,
        OutdoorOption : UserActivityPreference.OutdoorOption,
        VenueIndoor : UserActivityPreference.VenueIndoor,
        IndoorOption : UserActivityPreference.IndoorOption,
        Weekdays : UserActivityPreference.Weekdays,
        Weekends : UserActivityPreference.Weekends,
        Mornings : UserActivityPreference.Mornings,
        LunchHours : UserActivityPreference.LunchHours,
        Evenings : UserActivityPreference.Evenings,
        OtherPreferences : UserActivityPreference.OtherPreferences,
        PhysicalActivity : UserActivityPreference.PhysicalActivity,
        PhysicalOption : UserActivityPreference.PhysicalOption,
        SmallGroupSize : UserActivityPreference.SmallGroupSize,
        LargeGroupSize : UserActivityPreference.LargeGroupSize,
        BringFamily : UserActivityPreference.BringFamily
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

  render() {
    return (
      <div>
        {this.state.ActionMessage}
        <Segment>
          <h3>Venue: </h3>
           <Form.Field width="9">
              <Checkbox id="VenueOutdoor" checked={UserActivityPreference.VenueOutdoor} onChange={this.handleControlChange.bind(this)} toggle label='Outdoor'/>
              {UserActivityPreference.VenueOutdoor ? <OutdoorOptionsView /> : null}                 
           </Form.Field>
           <Form.Field width="9">
              <Checkbox id="VenueIndoor" checked={UserActivityPreference.VenueIndoor} onChange={this.handleControlChange.bind(this)} toggle label='Indoor'/>    
              {UserActivityPreference.VenueIndoor ? <IndoorOptionsView /> : null}          
           </Form.Field>
        </Segment>
        <Segment>
          <h3>Time: </h3>
          <Form.Field width="9">
            <Checkbox id="Weekdays" checked={UserActivityPreference.Weekdays} label='Weekdays' onChange={this.handleControlChange.bind(this)} />
            <span> &nbsp; | &nbsp; </span>
            <Checkbox id="Weekends" checked={UserActivityPreference.Weekends} label='Weekends' onChange={this.handleControlChange.bind(this)} /> 
          </Form.Field> 
          <Form.Field width="9">
            <Checkbox id="Mornings" checked={UserActivityPreference.Mornings} label='Mornings (before 10:00AM)' onChange={this.handleControlChange.bind(this)} />
            <span> &nbsp; | &nbsp; </span>
            <Checkbox id="LunchHours" checked={UserActivityPreference.LunchHours} label='Lunch hours (12:00 - 2:00)' onChange={this.handleControlChange.bind(this)} />
            <span> &nbsp; | &nbsp; </span>
            <Checkbox id="Evenings" checked={UserActivityPreference.Evenings} label='evening (after 6:00PM)' onChange={this.handleControlChange.bind(this)} />
          </Form.Field>
          <Form.Field>
            <h4>Any other preference?</h4>
            <Form.Field
              id="OtherPreferences" 
              value={UserActivityPreference.OtherPreferences} 
              control={TextArea}
              style={{ minWidth: 595, minHeight : 70 }} 
              placeholder='Tell us more...'
              onChange={this.handleControlChange.bind(this)} />
          </Form.Field>
        </Segment>
        <Segment>
          <h3>Activity type: </h3>
          <Form.Field width="9">
              <Checkbox 
                id="PhysicalActivity" 
                checked={UserActivityPreference.PhysicalActivity} 
                onChange={this.handleControlChange.bind(this)} 
                toggle 
                label='Physical activities'
              />
              {UserActivityPreference.PhysicalActivity ? <PhysicalActivityOptionsView /> : null}              
           </Form.Field>
           <label htmlFor="">Prefered size of groups for activities:</label>
           <Form.Field width="9">
              <Checkbox
                id="SmallGroupSize" 
                toggle 
                label='Small' 
                checked={UserActivityPreference.SmallGroupSize}
                onChange={this.handleControlChange.bind(this)}
              /> 
              <span> &nbsp; &nbsp; &nbsp; </span>
              <Checkbox 
                id="LargeGroupSize"
                toggle 
                label='Large' 
                checked={UserActivityPreference.LargeGroupSize}
                onChange={this.handleControlChange.bind(this)}
              />                   
           </Form.Field>
           <Checkbox 
              id="BringFamily"
              checked={UserActivityPreference.BringFamily} 
              label='Bring family members along for activities' 
              onChange={this.handleControlChange.bind(this)} 
            />
        </Segment>
        <Segment>
          <h3>Groups: </h3>
        </Segment>
        <Button.Group floated='right' >
          <Button>Cancel</Button>
          <Button.Or />
          <Button positive onClick={(e) => this.SaveUserData(e)}>Save</Button>
        </Button.Group>
      </div>
    );
  }
};

class OutdoorOptionsView extends Component{
  constructor (){
    super();
    this.state = {
      OutdoorOption: UserActivityPreference.OutdoorOption};
  }  

  handleChange = (e, { value }) => {
    this.setState({ OutdoorOption: value });
    UserActivityPreference.OutdoorOption = value;
  }

  render(){
    return(
      <div>
        <span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>
        <Radio
         label='Near by places only'
         name='radioGroup1'
         value='NearBy'
         checked={this.state.OutdoorOption === 'NearBy'}
         onChange={this.handleChange}
        />
        <span> &nbsp; | &nbsp; </span>
        <Radio
          label='No preference'
          name='radioGroup1'
          value='NoPreference'
          checked={this.state.OutdoorOption === 'NoPreference'}
          onChange={this.handleChange}
        /> 
      </div>
    );
  }
};

class IndoorOptionsView extends Component{
  constructor (){
    super();
    this.state = {
      IndoorOption: UserActivityPreference.IndoorOption};
  }  

  handleChange = (e, { value }) => {
    this.setState({ IndoorOption: value });
    UserActivityPreference.IndoorOption = value;
  }

  render(){
    return(
      <div>
        <span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>
        <Radio
         label='In the office only'
         name='radioGroup2'
         value='OfficeOnly'
         checked={this.state.IndoorOption === 'OfficeOnly'}
         onChange={this.handleChange}
        />
        <span> &nbsp; | &nbsp; </span>
        <Radio
          label='No preference'
          name='radioGroup2'
          value='NoPreference'
          checked={this.state.IndoorOption === 'NoPreference'}
          onChange={this.handleChange}
        /> 
      </div>
    );
  }
};

class PhysicalActivityOptionsView extends Component{
  constructor (){
    super();
    this.state = {
      PhysicalOption: UserActivityPreference.PhysicalOption};
  }  

  handleChange = (e, { value }) => {
    this.setState({ PhysicalOption: value });
    UserActivityPreference.PhysicalOption = value
  }

  render(){
    return(
      <div>
        <span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>
        <Radio
         label='Light activities only'
         name='radioGroup3'
         value='Light'
         checked={this.state.PhysicalOption === 'Light'}
         onChange={this.handleChange}
        />
        <span> &nbsp; | &nbsp; </span>
        <Radio
          label='Bring it ON!!'
          name='radioGroup3'
          value='heavy'
          checked={this.state.PhysicalOption === 'heavy'}
          onChange={this.handleChange}
        /> 
      </div>
    );
  }
};