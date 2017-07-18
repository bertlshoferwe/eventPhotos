import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Dimensions, BackHandler, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { emailChanged, passwordChanged, registerUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = { 
                  backPress:false,
                  width: Dimensions.get('window').width,
                  height: Dimensions.get('window').height, 
               };

          this.handleBackButton = this.handleBackButton.bind(this);
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


  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  registerButtonPress() {
    const { email, password } = this.props;

    this.props.registerUser({ email, password });
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
  },
  cardStyle: {
    width: this.state.width-30,
    backgroundColor:'#1b365d'
  },
  registerCardSectionStyle:{
    backgroundColor:'#ccaed0'
  },
  registerButton:{
    backgroundColor:'#ccaed0',
    borderColor:'#ccaed0'
  },
  registerText:{
    color:'#fff',
    fontSize: 20,
    fontWeight: '900',
  },
  errorTextStyle: {
    flex:1,
    textAlign: 'center',
    color: 'red',
    paddingTop: 2,
    paddingBottom: 2
  },
};
      const renderButton = (this.props.loading) ? 
                                                    <Spinner size="large" />
                                              :
                                                    <Button onPress={this.registerButtonPress.bind(this)} 
                                                            buttonStyle={ styles.registerButton} 
                                                            textStyle={styles.registerText}
                                                            >
                                                        Sign Up
                                                    </Button>
                                                  

      const errorMessage = (!this.props.registerError) ? 
                                                      <View/>
                                                    :
                                                      <Card> 
                                                        <CardSection> 
                                                          <Text style={styles.errorTextStyle}>
                                                            {this.props.registerError}
                                                          </Text>
                                                        </CardSection>
                                                      </Card>
                                                        ;                                                      



    return (
  <Image 
      onLayout={this.onLayout}
      style={ styles.backgroundImage }
      source={require('./images/background1.jpg')} 
    >   
        <Card style={styles.cardStyle}>  
          <Card>
            <CardSection>
              <Input
                label= {<Icon name="md-mail" size={40} />}
                placeholder="email@gmail.com"
                onChangeText={this.onEmailChange.bind(this)}
                value={this.props.email}
              />
            </CardSection>
          </Card>  

          <Card>
            <CardSection>
              <Input
                secureTextEntry
                label= {<Icon name="md-lock" size={40} />}
                placeholder="password"
                onChangeText={this.onPasswordChange.bind(this)}
                value={this.props.password}
              />
            </CardSection>
          </Card>
          
              {errorMessage}   

          <Card>
            <CardSection style={styles.registerCardSectionStyle}>
              { renderButton }
            </CardSection>
          </Card>      
      </Card>
  </Image>
    );
  }
}


const mapStateToProps = ({ auth }) => {
  const { email, password, registerError, loading, success } = auth;

  return { email, password, registerError, loading, success };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, registerUser
})(RegisterForm);
