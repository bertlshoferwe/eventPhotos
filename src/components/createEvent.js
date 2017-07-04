import React, { Component }                             from 'react';
import { Text }                                         from 'react-native';
import { connect }                                      from 'react-redux';
import { eventCreate, eventChange, pinChange}           from '../actions';
import { Card, CardSection, Input, Button, Spinner }    from './common';

class CreateEvent extends Component {

    Constructor(props) {
        Super(props);

        this.onEventNameChange = this.onEventNameChange.bind(this);
        this.onPinChange = this.onPinChange.bind(this);
        this.eventButtonPress = this.eventButtonPress.bind(this);
    }

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

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Event Name:"
                        placeholder="My Event Name"
                        onChangeText={this.onEventNameChange}
                        value={this.props.eventName} />
                </CardSection>

                <CardSection>
                    <Input
                        label="Pin"
                        placeholder="EX. 1234"
                        onChangeText={this.onPinChange}
                        value={this.props.eventPin} />
                </CardSection>

                <CardSection style={{display: (this.props.loading) ? 'block' : 'none'}}>
                    <Spinner size="large" />
                </CardSection>
                <CardSection style={{display: (!this.props.loading) ? 'block' : 'none'}}>
                    <Text>
                        { this.props.error }
                    </Text>
                    <Button onPress={this.eventButtonPress}>
                        Create Event
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        eventName : state.event.eventName,
        eventPin  : state.event.eventPin,
        error     : state.event.error,
        loading   : state.event.loading
    };
};

export default connect(mapStateToProps, {
    eventCreate, eventChange, pinChange
})(CreateEvent);
