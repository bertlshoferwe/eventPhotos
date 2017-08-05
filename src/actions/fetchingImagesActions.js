import firebase from 'firebase'
import { Actions } from 'react-native-router-flux';
import {
  FETCHING_IMAGES,
  FETCHING_IMAGES_SUCCESS,
  SELECTED_PIN
} from './types';


export const galleryFetch = ({joinPin}) => {
  const { currentUser } = firebase.auth();
  const db = firebase.database().ref(`Created_Events/${joinPin}/images`);
  return (dispatch) => {
    dispatch({ type: FETCHING_IMAGES });
    db.on('value', snap => {
        dispatch({
          type: FETCHING_IMAGES_SUCCESS,
          payload: snap.val()
        })
      })
     };
    };


    export const setPin = ({joinPin}) => {
      return{
        type: SELECTED_PIN,
        payload: {joinPin}
      }
    }