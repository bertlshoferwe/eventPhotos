import firebase from 'firebase'
import { Actions } from 'react-native-router-flux';
import {
  FETCHING_IMAGES,
  FETCHING_IMAGES_SUCCESS,
  SELECTED_PIN,
  FETCHING_EVENT_IMAGES,
  FETCHING_EVENT_IMAGES_SUCCESS,
  SELECTED_IMAGE,
  CLEAR_IMAGE
} from './types';


export const galleryFetch = ({joinPin}) => {
  const { currentUser } = firebase.auth();
  const db = firebase.database().ref(`Images/${joinPin}`);
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

    export const SelectedURL = ({selectedImage}) => {
      return{
        type: SELECTED_IMAGE,
        payload: {selectedImage}
      }
    }

    export const clearImage = () => {
      return{
        type: CLEAR_IMAGE
      }
    }

    export const eventImageFetch = () => {
  const { currentUser } = firebase.auth();
  const db = firebase.database().ref(`Images/`);
  return (dispatch) => {
    dispatch({ type: FETCHING_EVENT_IMAGES });
    db.on('value', snap => {
        dispatch({
          type: FETCHING_EVENT_IMAGES_SUCCESS,
          payload: snap.val()
        })
      })
     };
    };