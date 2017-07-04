import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/registerForm';
import CurrentEvent from './components/currentEvent';
import JoinEvent from './components/joinEvent';
import CreateEvent from './components/createEvent';
import Picture from './components/camera';


const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="Event Photos" />
        <Scene key="Register" component={RegisterForm} title="Register" />
      </Scene>

      <Scene key="main">
        <Scene
          onRight={() => Actions.JoinEvent()}
          rightTitle="Join"
          onLeft={() => Actions.CreateEvent()}
          leftTitle="Create"
          key="CurrentEvents"
          component={CurrentEvent}
          title="Current Events"
          initial
        />
      </Scene>
      <Scene key="JoinEvent" component={JoinEvent} title="Join Event" />
      <Scene key="CreateEvent" component={CreateEvent} title="Create Event" direction="leftToRight"/>
      <Scene key="ShowCamera" component={Picture} direction="vertical"  />
    </Router>
  );
};

export default RouterComponent;
