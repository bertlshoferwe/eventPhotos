import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import eventReducer from './eventReducer';
import JoinedEventReducer from'./JoinedEventReducer';
import fetchedImageRedcuer from './fetchedImagesReducer';

export default combineReducers({
  auth: AuthReducer,
  event: eventReducer,
  joinedEvent: JoinedEventReducer,
  fetchedImages: fetchedImageRedcuer
});
