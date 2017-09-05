import React, { Component } from 'react';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text, View, TouchableOpacity, Image, Dimensions, BackHandler,ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, registerUser } from '../actions';
import { Actions} from 'react-native-router-flux';
import { Card, CardSection, Input, Button, Spinner } from './common';


class LoginForm extends Component {
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

  componentWillMount() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      Actions.main();
    } 
  });
}
  componentDidMount() {
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  componentWillUnmount() {
           BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  handleBackButton() {
          if(!this.state.backPress) {
                    ToastAndroid.show('Back again to exit', ToastAndroid.SHORT);
                    this.setState({backPress:true});
                    setTimeout(() => {
                    this.setState({backPress:false});
                  },2500)
                  return true;;
            } else {
                  BackHandler.exitApp()
                    return false;
            }
  }
                       
  onEmailChange(text) {
          this.props.emailChanged(text);
  }

  onPasswordChange(text) {
          this.props.passwordChanged(text);
  }

  loginButtonPress() {
          const { email, password } = this.props;

          this.props.loginUser({ email, password });
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
                    loginButtonCardSectionStyle:{
                      backgroundColor:'#ccaed0',
                      marginTop: 20,
                      marginLeft: 40,
                      marginRight: this.state.width/2
                    },
                    loginButton:{
                      borderColor:'#ccaed0',
                      backgroundColor:'#ccaed0',
                    },
                    loginText:{
                      color:'#fff',
                      fontSize: 20,
                      fontWeight: '900',
                    },
                    createCardSectionStyle: {
                      padding: 2, 
                      backgroundColor: '#ece3a5',
                      bottom: 1,
                      height: 40,
                      position: 'absolute',
                      width: this.state.width-40,
                    },
                    createButton:{
                      borderColor:'#ece3a5',
                      backgroundColor: '#ece3a5',
                    },
                    createText:{
                      color:'#1b365d',
                      fontWeight: '500',
                    },
                    errorInfo: {
                      flex:1,
                      color: 'red',
                      paddingTop: 2,
                      paddingBottom: 2,
                      textAlign: 'center',
                    },
                    successInfo: {
                      flex:1,
                      paddingTop: 2,
                      color: 'green',
                      paddingBottom: 2,
                      textAlign: 'center',
                    }
              };

      const renderButton = (this.props.loading) ? 
                                                      <Spinner size="large" />
                                              :
                                                      <Button onPress={this.loginButtonPress.bind(this)} 
                                                              buttonStyle={ styles.loginButton} 
                                                              textStyle={styles.loginText}>
                                                        Login
                                                      </Button>
                                                  ;

    const errorMessage = (!this.props.error) ? 
                                                          <View/>
                                                  :
                                                          
                                                            <CardSection style={styles.inputMargin}> 
                                                              <Text style={styles.errorInfo}>
                                                                {this.props.error}
                                                              </Text>
                                                            </CardSection>
                                                           
                                                      ;    

    const successMessage = (!this.props.success) ? 
                                                      <View/>
                                              :
                                                      
                                                        <CardSection style={styles.inputMargin}>
                                                            <Text style={styles.successInfo}>
                                                              {this.props.success}
                                                            </Text>
                                                        </CardSection>
                                                      
                                                  ;
                                                  
    return (
  <View style={ styles.backgroundImage } onLayout={ this.onLayout } >

    
        <Image 
          source={require('./images/logo2.png')}
          style={ styles.logoImage } 
          />
      
        <CardSection style={styles.inputMarginTop }>
          <Input
            returnKeyTypes = 'next'
            bluronsubmit={false}
            onsubmitediting={() => {this.nextInput.focus()}}
            label= {<Icon name="email" size={40} />}
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>
    

       
        <CardSection style={styles.inputMargin}>
          <Input
            Ref={nextInput => this.nextInput = nextInput}
            returnKeyTypes = 'go'
            onSubmitEditing={ this.loginButtonPress.bind(this) }
            secureTextEntry
            label= {<Icon name="lock" size={40} />}
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>
    

    
    {errorMessage}
    {successMessage}

   
      <CardSection style={styles.loginButtonCardSectionStyle}>    
          { renderButton }
      </CardSection>
    

  

    
         <Card style={styles.createCardSectionStyle}>
                <Button onPress={ () => Actions.Register()}  
                        buttonStyle={ styles.createButton} 
                        textStyle={styles.createText}
                        >
                  Create new account
                </Button>
        </Card>
       
    </View>  
    );
  }
}



const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, success } = auth;

  return { email, password, error, loading, success };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, registerUser
})(LoginForm);
