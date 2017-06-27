import {
  EVENT_NAME_CHANGE,
  PIN_CHANGE,
  CREATE_EVENT,
  CREATE_EVENT_FAIL,
  CREATE_EVENT_SUCCESS,
  JOIN_EVENT,
  JOIN_EVENT_PIN,
  PATH_TO_PHOTO,
  PHOTO_SAVED,
  PHOTO_CLEARED
} from '../actions/types';

const INITIAL_STATE = {
 event: null,
 eventName: '',
 eventPin: '',
 error: '',
 loading: false,
 joinPin: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case EVENT_NAME_CHANGE:
      return { ...state, eventName: action.payload };
    case PIN_CHANGE:
      return { ...state, eventPin: action.payload };
    case CREATE_EVENT:
      return { ...state, loading: true, error: '' };
    case CREATE_EVENT_FAIL:
      return { ...state, ...INITIAL_STATE, error:'Error creating your event'};
    case CREATE_EVENT_SUCCESS:
      return {...state, ...INITIAL_STATE, event: action.payload};
    case JOIN_EVENT_PIN:
      return { ...state, joinPin: action.payload}
    default:
      return state;
  }
};

