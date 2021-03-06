import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  REGISTER_USER,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false,
  success: '',
  registerError: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.',success:'', password: '', loading: false };
    case REGISTER_USER:
      return{ ...state, loading: true, error: ''};
    case REGISTER_USER_SUCCESS:
      return{ ...state, loading: false, password: '', user: action.payload, success: 'Successfully registered'};
    case REGISTER_USER_FAIL:
      return{ ...state, ...INITIAL_STATE, registerError: 'Error creating account'}; 
    default:
      return state;
  }
};
