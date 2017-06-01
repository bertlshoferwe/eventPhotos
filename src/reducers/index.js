import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import eventReducer from './eventReducer'

export default combineReducers({
  auth: AuthReducer,
  event: eventReducer,
});
