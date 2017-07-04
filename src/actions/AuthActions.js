import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER
} from './types';

export function emailChanged(text){
    'use strict';

    return {
        type: EMAIL_CHANGED,
        payload: text
    };
}

export function passwordChanged(text){
    'use strict';

    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
}

export function loginUser({ email, password }){
    'use strict';

    return (dispatch) => {
        dispatch({ type: LOGIN_USER });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user))
            .catch(() => loginUserFail(dispatch));
    };
}

function loginUserFail(dispatch){
    'use strict';

    dispatch({ type: LOGIN_USER_FAIL });
}

function loginUserSuccess(dispatch, user){
    'use strict';

    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });

    Actions.main();
}


export function registerUser({ email, password }){
    // 'use strict';

    return (dispatch) => {
        dispatch({ type: REGISTER_USER });

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => registerUserSuccess(dispatch, user))
            .catch(() => registerUserFail(dispatch));
    };
}

function registerUserFail(dispatch){
    // 'use strict';

    dispatch({ type: REGISTER_USER_FAIL });
}

function registerUserSuccess(dispatch, user){
    // 'use strict';

    dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: user
    });
    Actions.login({type: "reset"});
}