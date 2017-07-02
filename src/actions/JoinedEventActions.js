import firebase from 'firebase'
import { Actions } from 'react-native-router-flux';
import {
  EVENTS_FETCH_SUCCESS,
} from './types';


export const eventsFetch = () => {
  const { currentUser } = firebase.auth();
  const db = firebase.database().ref(`Joined_Events/${currentUser.uid}`);
                    
  return (dispatch) => {
      db.on('value', snap => {
        dispatch({
          type: EVENTS_FETCH_SUCCESS,
          payload: snap.val()
        })
      })
     };
    };