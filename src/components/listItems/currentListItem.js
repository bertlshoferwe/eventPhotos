import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, Dimensions,Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, IconButton } from '../common';

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
                          height:295,
                          zIndex: -1,
                          alignItems:'center',
                          flexDirection: 'column', 
                          width: this.state.width-20,
                  },
                  Image:{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          bottom: 80,
                          right: 0,
                  },
                  textStyle: {
                          position: 'absolute',
                          bottom: 25,
                          fontSize: 25,
                          paddingLeft: 15,
                          fontWeight: '900',
                          color:'#1b365d',
                          backgroundColor: 'rgba(52, 52, 52, 0.0)'
                  },
                  floatingButtonStyle:{
                          left: 10,
                          bottom: 45,
                          height:70,
                          width:70,
                          position: 'absolute',
                          backgroundColor:'#8c4799',
                  },
                };
    const { joinName, joinPin } = this.props.joinedEvents;

    return (
      

            <Card  onLayout={this.onLayout} style={styles.cardStyle} >
                
                  <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} style={styles.Image}/>

                  <IconButton 
                        onpress={ () => Actions.ShowCamera({joinPin})} 
                        buttonStyle = { styles.floatingButtonStyle }
                        name="add-a-photo"
                        color='#c7c8ca' 
                        size={47}
                        /> 
               
                  <Text style={styles.textStyle}>
                    {joinName}
                  </Text>
                
              </Card>
         

    );
  }
}


export default ListItem