import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux';
import { Card, CardSection, Button } from './common';

class CurrentEvent extends Component {

  render() {
    return (
      <Card>
        <CardSection>
          <Button onPress={()=>Actions.ShowCamera()}>
            Launch Camera here
          </Button>  
        </CardSection>
        <CardSection>
          <Button onPress={()=>Actions.Demo()}>
            upload test
          </Button>  
        </CardSection>
      </Card>
    );
  }
}


export default CurrentEvent
