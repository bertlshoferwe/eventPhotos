import React, { Component }                     from 'react';
import { connect }                              from 'react-redux';
import { joinEvent, joinPinChange }             from '../actions';
import { Card, CardSection, Input, Button }     from './common';

class JoinEvent extends Component {

    Constructor(props) {
        Super(props);

        this.onPinChange = this.onPinChange.bind(this);
        this.joinButtonPress = this.joinButtonPress.bind(this);
    }

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
                        onChangeText={this.onPinChange}
                        value={this.props.joinPin} />
                </CardSection>

                <CardSection>
                    <Button onPress={this.joinButtonPress} >Join Event</Button>
                </CardSection>
            </Card>
        );
    }
}

const mapStateToProps = (event) => {
    return {
        joinPin : state.event.joinPin,
        error   : state.event.error,
        loading : state.event.loading
    };
};

export default connect(mapStateToProps, {
  joinEvent, joinPinChange
})(JoinEvent);