import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import {selectedEvent} from '../actions'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CardSection, Button } from './common';

class ListItem extends Component {

 onRowPress({joinPin}) {
        Actions.ShowCamera();
        this.props.selectedEvent({joinPin});
    }

  render() {
    const { joinName, joinPin } = this.props.joinedEvents;
    return (
      
          <CardSection style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Button onPress={this.onRowPress.bind(this)} >
            <Text style={styles.titleStyle}>
              {joinName}
            </Text> 
            </Button>
          </CardSection>

    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15,
    justifyContent: 'flex-start'
  }
};

export default connect(null, { selectedEvent })(ListItem);