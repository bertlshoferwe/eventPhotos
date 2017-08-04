import React, { Component } from 'react';
import { StyleSheet, BackHandler, ToastAndroid } from 'react-native';
import { Scene, Router, Actions, ActionConst } from 'react-native-router-flux';
import Splash from './components/splash';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/registerForm';
import CurrentEvent from './components/currentEvent';
import JoinEvent from './components/joinEvent';
import CreateEvent from './components/createEvent';
import Picture from './components/camera';
import Gallery from './components/gallery';



class RouterComponent extends Component {

 
  render() {
  return (
    <Router>
      
      <Scene key="SplashScreen">
        <Scene key="splash" component={Splash} hideNavBar/>
      </Scene>

      <Scene key="auth" >
        <Scene key="login" component={LoginForm} title="Event Photos" hideNavBar />
        <Scene key="Register" component={RegisterForm} title="Register" hideNavBar />
      </Scene>

      <Scene key="main"  >
        <Scene key="CurrentEvents" component={CurrentEvent} initial hideNavBar />
        <Scene key="JoinEvent" component={JoinEvent} title="Join Event" hideNavBar />
        <Scene key="CreateEvent" component={CreateEvent} title="Create Event" hideNavBar />
        <Scene key="ShowCamera" component={Picture} hideNavBar/>
        <Scene key="Gallery" component={Gallery} hideNavBar/>
      </Scene>  

    </Router>
    );
  }
};



export default RouterComponent;