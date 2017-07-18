import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';
import { Text, BackHandler, ToastAndroid, View, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';
import { eventCreate, eventChange, pinChange} from '../actions'
import { Card, CardSection, Input, Button, Spinner } from './common';

class CreateEvent extends Component {
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

    onEventNameChange(text) {
          this.props.eventChange(text);
  }

  onPinChange(text) {
          this.props.pinChange(text);
  }

  eventButtonPress(){
          const { eventName, eventPin } = this.props;

          this.props.eventCreate({ eventName, eventPin });
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
      createButton:{
        backgroundColor:'#ccaed0',
        borderColor:'#ccaed0'
      },
      createButtonText:{
        color:'#fff',
        fontSize: 20,
        fontWeight: '900',
      },
    };

          const renderButton = (this.props.loading) ? 
                                                    <Spinner size="large" />
                                              :
                                                     <Button onPress={this.eventButtonPress.bind(this)} 
                                                              buttonStyle={ styles.createButton } 
                                                              textStyle={ styles.createButtonText }>
                                                        Create Event
                                                    </Button>


    return (
   <Image 
        onLayout={this.onLayout}
        style={ styles.backgroundImage }
        source={require('./images/background1.jpg')} 
      >       
        <Card style={ styles.cardStyle }> 
          <Card>
            <CardSection >
              <Input
                label= {<Icon name="md-create" size={40} />}
                placeholder="My Event Name"
                onChangeText={this.onEventNameChange.bind(this)}
                value={this.props.eventName}
              />
            </CardSection>
            </Card>
            
            <Card>
            <CardSection>
                <Input
                label= {<Icon name="md-pricetag" size={40} />}
                placeholder="EX. 1234"
                onChangeText={this.onPinChange.bind(this)}
                value={this.props.eventPin}
              />
            </CardSection>
            </Card>

            <Card>
            <CardSection style={styles.cardSectionStyle}>
                { renderButton }
            </CardSection>

          </Card>
       </Card>   
 </Image>    
    );
  }
}

const styles = {
  backgroundImage: {
    flex:1,
    flexDirection: 'column',
    width: Dimensions.get('window').width, 
    height: Dimensions.get('window').height
  },
};

const mapStateToProps = ({ event }) => {
  const { eventName, eventPin, error, loading } = event;

  return { eventName, eventPin, error, loading };
};

export default connect(mapStateToProps, {
  eventCreate, eventChange, pinChange
})(CreateEvent);
