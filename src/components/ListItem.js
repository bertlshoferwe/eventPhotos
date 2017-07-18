import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, Dimensions,Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button } from './common';

class ListItem extends Component {
        constructor(props) {
            super(props);
            this.state = { 
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
                };

            this.onLayout = this.onLayout.bind(this);

          }

onLayout(e) {
                    this.setState({
                      width: Dimensions.get('window').width,
                      height: Dimensions.get('window').height,
                    });
                  }

  render() {
const styles = {
  cardStyle:{
          height:200,
          alignItems:'center',
          flexDirection: 'column', 
          width: this.state.width-20,
  },
  Image:{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 40,
          right: 0,
  },
  textStyle: {
          position: 'absolute',
          bottom: 10,
          fontSize: 20,
          paddingLeft: 15,
          fontWeight: '900',
          color:'#1b365d',
          backgroundColor: 'rgba(52, 52, 52, 0.0)'
  },
  floatingButtonStyle:{
          left: 10,
          width: 70,
          bottom: 15,
          height: 70,
          borderRadius: 50,
          position: 'absolute',
          backgroundColor:'#8c4799',
  },
  floatingButtonText:{
          color:'#c7c8ca',
          fontSize: 25,
          marginTop: 6,
          paddingTop: 0,
          paddingBottom: 0,
          fontWeight: '100',
  },
};
    const { joinName, joinPin } = this.props.joinedEvents;

    return (
      

            <Card  onLayout={this.onLayout} style={styles.cardStyle} >
                
                  <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} style={styles.Image}/>

                  <Button
                          onPress={ () => Actions.ShowCamera({joinPin})} 
                          buttonStyle = { styles.floatingButtonStyle } 
                          textStyle = { styles.floatingButtonText } 
                        >
                      <Icon name="md-camera" size={50} />
                  </Button>  
               
                  <Text style={styles.textStyle}>
                    {joinName}
                  </Text>
                
              </Card>
         

    );
  }
}


export default ListItem