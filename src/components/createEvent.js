import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { eventCreate, eventChange, pinChange} from '../actions'
import { Card, CardSection, Input, Button, Spinner } from './common';

class CreateEvent extends Component {

    onEventNameChange(text) {
    this.props.eventChange(text);
  }

  onPinChange(text) {
    this.props.pinChange(text);
  }

  eventButtonPress(){
      const { eventName, eventPin } = this.props;

    this.props.eventCreate({ eventName, eventPin });
  }

renderButton() {
    if (this.props.loading) {
      return  <CardSection>
                <Spinner size="large" />
              </CardSection>;  
    }

    return (
         <CardSection>
           <Text>
             { this.props.error }
           </Text>  
            <Button onPress={this.eventButtonPress.bind(this)}>
                Create Event
            </Button>
        </CardSection>
    );
  }

  render() {

    return (
      <Card>
        <CardSection>
          <Input
            label="Event Name:"
            placeholder="My Event Name"
            onChangeText={this.onEventNameChange.bind(this)}
            value={this.props.eventName}
          />
        </CardSection>

        <CardSection>
            <Input
            label="Pin"
            placeholder="EX. 1234"
            onChangeText={this.onPinChange.bind(this)}
            value={this.props.eventPin}
          />
        </CardSection>

        {this.renderButton()}

      </Card>
    );
  }
}

const mapStateToProps = ({ event }) => {
  const { eventName, eventPin, error, loading } = event;

  return { eventName, eventPin, error, loading };
};

export default connect(mapStateToProps, {
  eventCreate, eventChange, pinChange
})(CreateEvent);
