import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const IconButton = (props) => {
  const { buttonStyle, textStyle } = styles;

  return (
        <TouchableOpacity 
                onPress={ props.onpress } 
                style={[buttonStyle, props.buttonStyle] }>

                  <Text>
                      <Icon name={props.name} size={props.size} color={props.color} />
                  </Text>

        </TouchableOpacity>

  );
};

const styles = {
  buttonStyle: {
    height:60,
    width: 60,
    borderRadius: 100,
    borderColor: '#fff',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor:'#ece3a5',
  }
};

export { IconButton };
