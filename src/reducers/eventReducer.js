import {
    EVENT_NAME_CHANGE,
    PIN_CHANGE,
    CREATE_EVENT,
    CREATE_EVENT_FAIL,
    CREATE_EVENT_SUCCESS,
    JOIN_EVENT_PIN,
    SELECTED_EVENT_PIN,
} from '../actions/types';

const INITIAL_STATE = {
    event: null,
    eventName: '',
    eventPin: '',
    error: '',
    loading: false,
    fetchedEvent: '',
    joinPin: '',
    selectedPin: null,
};

export default (state = INITIAL_STATE, action) => {
    'use strict';

    switch (action.type) {
        case EVENT_NAME_CHANGE:
            state = {state, eventName: action.text };
            break;

        case PIN_CHANGE:
            state = {state, eventPin: action.text };
            break;

        case JOIN_EVENT_PIN:
            state = {state, joinPin: action.text};
            break;

        case CREATE_EVENT:
            state = {state, loading: true, error: '' };
            break;

        case CREATE_EVENT_FAIL:
            state = {state, INITIAL_STATE, error:'Error creating your event'};
            break;

        case CREATE_EVENT_SUCCESS:
            state = {state, INITIAL_STATE, event: action.payload};
            break;

        case SELECTED_EVENT_PIN:
            state = {state, selectedPin: action.joinPin};
            break;

        default:
    }

    return state;
};

