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
  JOIN_EVENT_PIN,
  PATH_TO_PHOTO,
  PHOTO_SAVED,
  PHOTO_CLEARED,
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

    firebase.database().ref(`/Events/Created_Events/${currentUser.uid}`)
      .push({ eventName, eventPin})
      .then(() => { dispatch({type: CREATE_EVENT_SUCCESS});
                Actions.CurrentEvents({ type: 'reset' });
    });
  };
};



export const joinEvent = ( joinPin ) => {
  let pin = joinPin;  
let Url = "https://eventphotos-edff1.firebaseio.com/Events/Created_Events"  
let usersPath = "Events/Created_Events"
fetch(`${Url}/${usersPath}`, {  
  
  
  body: JSON.stringify({
    evenpin: {pin}
  })
});
};
  


