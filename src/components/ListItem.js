import React, { Component } from 'react';
import { Text} from 'react-native';
import { CardSection, Button } from './common';

const ListItem = (props) => {

    return (
      
          <CardSection style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Button onPress={props.onRowPress(props.jojinedEvent)} >
                <Text style={styles.titleStyle}>
                  {props.joinEvent.joinName}
                </Text> 
              </Button>
          </CardSection>

    );
  
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15,
    justifyContent: 'flex-start'
  }
};

export default ListItem;