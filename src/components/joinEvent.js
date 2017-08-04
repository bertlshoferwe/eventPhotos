import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, BackHandler, ToastAndroid, Dimensions, Image } from 'react-native';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import { joinEvent, joinPinChange } from '../actions'
import { Card, CardSection, Input, Button, IconButton } from './common';

class JoinEvent extends Component {
    constructor(props) {
    super(props);
    this.state = { 
      backPress:false,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
                        };
    this.handleBackButton = this.handleBackButton.bind(this)
    this.onLayout = this.onLayout.bind(this);

  }

  componentDidMount() {
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  componentWillUnmount() {
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  handleBackButton() {
            if(!this.state.backPress) {
                      Actions.pop()
                    return true;;
              } 
  }

    onPinChange(text) {
            this.props.joinPinChange(text);
  }

  joinButtonPress(){
            const { joinPin } = this.props;

            this.props.joinEvent({ joinPin });
  }
  onLayout(e) {
                    this.setState({
                      width: Dimensions.get('window').width,
                      height: Dimensions.get('window').height,
                    });
                  }


  render() {

    const styles = {
                    backgroundImage: {
                      flex:1,
                      alignItems: 'center',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      width: this.state.width, 
                      height: this.state.height,
                      backgroundColor:'#009389'
                    },
                    joinButton:{
                      backgroundColor:'#ccaed0',
                      borderColor:'#ccaed0'
                    },
                    joinButtonText:{
                      color:'#fff',
                      fontSize: 20,
                      fontWeight: '900',
                    },
                    inputMarginTop: { 
                      marginLeft: 40,
                      marginRight: 40
                    },
                    joinCardSectionStyle:{
                      backgroundColor:'#ccaed0',
                      marginTop: 20,
                      marginLeft: 40,
                      marginRight: this.state.width/2
                    },
                    topLeft: {
                      position: 'absolute',
                      top: 40,
                      left: 20,
                      backgroundColor: 'transparent'
                    }
                  };

    return (

      <View
          onLayout={this.onLayout}
          style={ styles.backgroundImage }
          >

          <IconButton  
              buttonStyle={ styles.topLeft }
              onpress={ () => Actions.pop() }
              name="arrow-back" 
              color='#fff'
              size={40}
              />  
            
                <CardSection style={ styles.inputMarginTop }>
                    <Input
                        label=  {<Icon name="fiber-pin" size={40} />}
                        placeholder="EX. 1234"
                        onChangeText={this.onPinChange.bind(this)}
                        value={this.props.joinPin}
                    />
                </CardSection>
              
                <CardSection style={styles.joinCardSectionStyle}>
                    <Button onPress={this.joinButtonPress.bind(this)}
                            buttonStyle={ styles.joinButton} 
                            textStyle={styles.joinButtonText}
                    >
                        Join Event
                    </Button>
                </CardSection>
           
          </View>  
    );
  }
}

const mapStateToProps = ({ event }) => {
  const { joinPin, error, loading } = event;

  return{  joinPin, error, loading };
};

export default connect(mapStateToProps, {
  joinEvent, joinPinChange
})(JoinEvent);