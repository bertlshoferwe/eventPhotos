import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { BackHandler, ToastAndroid, Dimensions, Image } from 'react-native';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import { joinEvent, joinPinChange } from '../actions'
import { Card, CardSection, Input, Button } from './common';

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
        justifyContent: 'flex-start',
        width: this.state.width, 
        height: this.state.height,
      },
      cardStyle: {
        width: this.state.width-30,
        backgroundColor:'#1b365d'
      },
      cardSectionStyle:{
        backgroundColor:'#ccaed0'
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
    };

    return (

      <Image 
          onLayout={this.onLayout}
          style={ styles.backgroundImage }
          source={require('./images/background1.jpg')} 
        >  
            <Card style = { styles.cardStyle }>
              <Card>
                <CardSection>
                    <Input
                        label=  {<Icon name="md-pricetag" size={40} />}
                        placeholder="EX. 1234"
                        onChangeText={this.onPinChange.bind(this)}
                        value={this.props.joinPin}
                    />
                </CardSection>
              </Card>
                <CardSection style = { styles.cardSectionStyle }>
                    <Button onPress={this.joinButtonPress.bind(this)}
                            buttonStyle={ styles.joinButton} 
                            textStyle={styles.joinButtonText}
                    >
                        Join Event
                    </Button>
                </CardSection>
            </Card>
          </Image>  
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