// Import libraries for making a component
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Make a component
const Header = (props) => {
  const { textStyle, viewStyle, buttonStyle } = styles;

  return (
    <View style={viewStyle}>
      <TouchableOpacity 
                onPress={ props.onpress } 
                style={[buttonStyle, props.buttonStyle] }>

                  <Text>
                      <Icon name={props.name} size={props.size} color={props.color} />
                  </Text>

        </TouchableOpacity>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#F8F8F8',
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
  textStyle: {
    fontSize: 20
  },
  buttonStyle: {
    width: 50,
    borderColor: '#fff',
    position: 'absolute',
    top:22,
    left:10,
  }
};

// Make the component available to other parts of the app
export { Header };
