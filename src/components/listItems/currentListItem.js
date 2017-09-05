import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, Dimensions,Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, IconButton } from '../common';
import { setPin } from '../../actions';
import { connect } from 'react-redux';
import _ from 'lodash';

class ListItem extends Component {
        constructor(props) {
            super(props);
            this.state = { 
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
                    joinPin: this.props.joinedEvents.joinPin,
                    joinName: this.props.joinedEvents.joinName,
                };

            this.onLayout = this.onLayout.bind(this);
            this.onButtonPress = this.onButtonPress.bind(this)

          }

          onLayout(e) {
              this.setState({
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
              });
            }
onButtonPress() {
        const {joinPin} = this.state
         this.props.setPin({joinPin});
         Actions.ShowCamera()
}

  render() {
const { joinPin, joinName } = this.state
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
    return (
      

            <Card  onLayout={this.onLayout} style={styles.cardStyle} >
                
                  <Image source={{uri: 'google.com' }} style={styles.Image}/>

                  <IconButton 
                        onpress={ this.onButtonPress } 
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

const mapStateToProps = state => {
          
        const selectedPin = state.fetchedImages.selectedPin.joinPin

          return{ selectedPin };
        };

export default connect(mapStateToProps, { setPin })(ListItem)