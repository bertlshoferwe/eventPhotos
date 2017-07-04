import firebase                   from 'firebase';
import { EVENTS_FETCH_SUCCESS }   from './types';


export const eventsFetch = () => {
    'use strict';
    const { currentUser } = firebase.auth();
    const db = firebase.database().ref(`Joined_Events/${currentUser.uid}`);

    return (dispatch) => {
        db.on('value', snap => {
            dispatch({
                type: EVENTS_FETCH_SUCCESS,
                payload: snap.val()
            });
        });
    };
};