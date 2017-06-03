import firebase from 'firebase'
import { Actions } from 'react-native-router-flux';
import {
  EVENT_NAME_CHANGE,
  PIN_CHANGE,
  CREATE_EVENT,
  CREATE_EVENT_FAIL,
  CREATE_EVENT_SUCCESS,
  EVENT_FETCH_SUCCESS,
  JOIN_EVENT,
  JOIN_EVENT_PIN
} from './types';

export const eventChange = (text) => {
  return {
    type: EVENT_NAME_CHANGE,
    payload: text
  };
};

export const pinChange = (text) => {
  return {
    type: PIN_CHANGE,
    payload: text
  };
};

export const joinPinChange = (text) => {
  return{
    type: JOIN_EVENT_PIN,
    payload: text
  }
}


export const eventCreate = ({ eventName, eventPin }) => {
  const { currentUser } = firebase.auth();
  
  return (dispatch) => {
    dispatch({ type: CREATE_EVENT });

    firebase.database().ref(`/user/${currentUser.uid}/Join_Events`)
      .push({ eventName, eventPin })
      .then(() => { dispatch({type: CREATE_EVENT_SUCCESS});
                Actions.CurrentEvents({ type: 'reset' });});
      
  };
};



export const joinEvent = ( joinPin ) => {
  var ref = firebase.database().ref("Created_Events");
ref.orderByChild("eventPin").equalTo(joinPin).on("child_added", function(snapshot) {
  console.log(snapshot.key);
});
};