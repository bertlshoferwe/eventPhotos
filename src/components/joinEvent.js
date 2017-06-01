import React, { Component } from 'react';
import { connect } from 'react-redux';
import { joinEvent, joinPinChange } from '../actions'
import { Card, CardSection, Input, Button } from './common';

class JoinEvent extends Component {

    onPinChange(text) {
        this.props.joinPinChange(text);
  }

  joinButtonPress(){
      const { joinPin } = this.props;

    this.props.joinEvent({ joinPin });
  }


  render() {
    return (
            <Card style = {{ flex: 1 }}>
                <CardSection>
                <Input
                    label="Event Pin:"
                    placeholder="EX. 1234"
                    onChangeText={this.onPinChange.bind(this)}
                    value={this.props.joinPin}
                />
                </CardSection>

                <CardSection>
                    <Button onPress={this.joinButtonPress.bind(this)}>
                        Join Event
                    </Button>
                </CardSection>
            </Card>
    );
  }
}

const mapStateToProps = ({ event }) => {
  const { joinPin, error, loading } = event;

  return{  joinPin, error, loading };
};

export default connect(mapStateToProps, {
  joinEvent, joinPinChange
})(JoinEvent);