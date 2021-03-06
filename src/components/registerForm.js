import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Dimensions, BackHandler, ToastAndroid, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { emailChanged, passwordChanged, registerUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner, IconButton } from './common';

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
          this.onEmailChange = this.onEmailChange.bind(this)
          this.onPasswordChange =this.onPasswordChange.bind(this);
          this.registerButtonPress = this.registerButtonPress.bind(this);

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
                  backgroundColor:'#009389'
                },
                logoImage: {
                    alignSelf: 'center',
                    width: this.state.width -40,
                    height: this.state.height -520,
                    borderRadius: 10,
                    backgroundColor: '#fff'
                  },
                inputMargin: {
                  marginTop: 20,
                  marginLeft: 40,
                  marginRight: 40
                },
                inputMarginTop: { 
                  marginTop: 70,
                  marginLeft: 40,
                  marginRight: 40
                },
                registerCardSectionStyle:{
                  backgroundColor:'#ccaed0',
                  marginTop: 20,
                  marginLeft: 40,
                  marginRight: this.state.width/2
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
                topLeft: {
                  position: 'absolute',
                  top: 40,
                  left: 20,
                  backgroundColor: 'transparent'
                },
              };
      const renderButton = (this.props.loading) ? 
                                                    <Spinner size="large" />
                                              :
                                                    <Button onPress={() => this.registerButtonPress} 
                                                            buttonStyle={ styles.registerButton} 
                                                            textStyle={styles.registerText}
                                                            >
                                                        Sign Up
                                                    </Button>
                                                  

      const errorMessage = (!this.props.registerError) ? 
                                                      <View/>
                                                    :
                                                       
                                                        <CardSection style={styles.inputMargin}> 
                                                          <Text style={styles.errorTextStyle}>
                                                            {this.props.registerError}
                                                          </Text>
                                                        </CardSection>
                                                      
                                                        ; 
                                                        
    return (
  <View 
      onLayout={this.onLayout}
      style={ styles.backgroundImage }
    >   

        <Image 
          source={require('./images/logo2.png')}
          style={ styles.logoImage } 
          />
          
        <IconButton  
              buttonStyle={ styles.topLeft }
              onpress={ () => Actions.pop() }
              name="arrow-back" 
              color='#fff'
              size={40}
              />

            <CardSection style={ styles.inputMarginTop }>
              <Input
                returnKeyTypes = 'next'
                bluronsubmit={false}
                onsubmitediting={() => {this.nextInput.focus()}}
                autofocus={true}
                label= {<Icon name="email" size={40} />}
                placeholder="email@gmail.com"
                onChangeText={ this.onEmailChange }
                value={ this.props.email }
              />
            </CardSection>
          
            <CardSection style={ styles.inputMargin }>
              <Input
                Ref={nextInput => this.nextInput = nextInput}
                returnKeyTypes = 'go'
                onSubmitEditing={ this.registerButtonPress }
                secureTextEntry
                label= {<Icon name="lock" size={40} />}
                placeholder="password"
                onChangeText={ this.onPasswordChange }
                value={ this.props.password} 
              />
            </CardSection>
          
          
              {errorMessage}   

          
            <CardSection style={styles.registerCardSectionStyle}>
              { renderButton }
            </CardSection>
          
  </View>
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
