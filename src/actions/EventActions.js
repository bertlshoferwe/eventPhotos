import firebase from 'firebase'
import { Actions } from 'react-native-router-flux';
import {
  EVENT_NAME_CHANGE,
  PIN_CHANGE,
  CREATE_EVENT,
  CREATE_EVENT_FAIL,
  CREATE_EVENT_SUCCESS,
  JOIN_EVENT_PIN,
  FETCHING_JOINED_EVENTS
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
  const joinName = eventName;
  const joinPin = eventPin;
  return (dispatch) => {
    dispatch({ type: CREATE_EVENT });

    firebase.database().ref(`Created_Events/${eventPin}`)
      .set({ eventName, eventPin})
      .then(() => { dispatch({type: CREATE_EVENT_SUCCESS});

      firebase.database().ref(`Joined_Events/${currentUser.uid}/${eventPin}`)
      .set({joinName, joinPin})
    })
  Actions.pop();
  };
};
  

export const joinEvent = ({joinPin}) => {
  const { currentUser } = firebase.auth();
  const db = firebase.database().ref(`Created_Events/${joinPin}`);
                    
  return (dispatch) => {
    dispatch({ type: FETCHING_JOINED_EVENTS });
      db.once('value')
        .then( snap  => {
          var joinName = snap.child(`eventName`).val();
          var joinPin = snap.child(`eventPin`).val();

          firebase.database().ref(`Joined_Events/${currentUser.uid}/${joinPin}`)
          .set({joinPin, joinName});
        })
        Actions.pop();
      };
    };
