import firebase from 'firebase'
import { Actions } from 'react-native-router-flux';
import {
  EVENT_NAME_CHANGE,
  PIN_CHANGE,
  CREATE_EVENT,
  CREATE_EVENT_FAIL,
  CREATE_EVENT_SUCCESS,
  JOIN_EVENT_PIN,
  PATH_TO_PHOTO,
  PHOTO_SAVED,
  PHOTO_CLEARED,
  SELECTED_EVENT_PIN,
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
  
  return (dispatch) => {
    dispatch({ type: CREATE_EVENT });

    firebase.database().ref(`Created_Events/${eventPin}`)
      .set({ eventName, eventPin})
      .then(() => { dispatch({type: CREATE_EVENT_SUCCESS});
                Actions.CurrentEvents({ type: 'reset' });
    });
  };
};
  

export const joinEvent = ({joinPin}) => {
  const { currentUser } = firebase.auth();
  const db = firebase.database().ref(`Created_Events/${joinPin}`);
                    
  return (dispatch) => {
      db.once('value')
        .then( snap  => {
          var joinName = snap.child(`eventName`).val();
          var joinPin = snap.child(`eventPin`).val();

          firebase.database().ref(`Joined_Events/${currentUser.uid}/${joinPin}`)
          .set({joinPin, joinName});
        });
        Actions.CurrentEvents({ type: 'reset' });
      };
    };
    
export const selectedEvent = (joinPin) => {
  return {
    type: SELECTED_EVENT_PIN,
    joinPin
  };
};
