import firebase from 'firebase'
import { Actions } from 'react-native-router-flux';
import {
  FETCHING_EVENTS,
  FETCHING_JOINED_SUCCESS
} from './types';


export const eventsFetch = () => {
  const { currentUser } = firebase.auth();
  const db = firebase.database().ref(`Joined_Events/${currentUser.uid}`);
                    
  return (dispatch) => {
    dispatch({ type: FETCHING_EVENTS });
    db.on('value', snap => {
        dispatch({
          type: FETCHING_JOINED_SUCCESS,
          payload: snap.val()
        })
      })
     };
    };