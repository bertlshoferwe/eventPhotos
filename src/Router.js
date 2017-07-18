import React, { Component } from 'react';
import { StyleSheet, BackHandler, ToastAndroid } from 'react-native';
import { Scene, Router, Actions, ActionConst } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/registerForm';
import CurrentEvent from './components/currentEvent';
import JoinEvent from './components/joinEvent';
import CreateEvent from './components/createEvent';
import Picture from './components/camera';
import Splash from './components/splash';



class RouterComponent extends Component {

 
  render() {
  return (
    <Router>
      <Scene key="SplashScreen">
        <Scene key="splash" component={Splash} hideNavBar/>
      </Scene>

      <Scene key="auth" hideNavBar >
        <Scene key="login" component={LoginForm} title="Event Photos" type={ActionConst.RESET} />
        <Scene key="Register" component={RegisterForm} title="Register"/>
      </Scene>

      <Scene key="main" hideNavBar >
        <Scene key="CurrentEvents" component={CurrentEvent} initial />
        <Scene key="JoinEvent" component={JoinEvent} title="Join Event" />
        <Scene key="CreateEvent" component={CreateEvent} title="Create Event" />
        <Scene key="ShowCamera" component={Picture} hideNavBar/>
      </Scene>  

    </Router>
    );
  }
};



export default RouterComponent;