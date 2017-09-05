import {
  FETCHING_IMAGES,
  FETCHING_IMAGES_SUCCESS,
  SELECTED_PIN,
  FETCHING_EVENT_IMAGES_SUCCESS,
  FETCHING_EVENT_IMAGES,
  SELECTED_IMAGE,
  CLEAR_IMAGE
} from '../actions/types';

const INITIAL_STATE = {
  loading:false,
  listItems: '',
  selectedPin: '',
  eventImage: '',
  imageLoading: false,
  imageSelected: '',
  length: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case  FETCHING_IMAGES:
      return { ...state, loading: true};
    case FETCHING_IMAGES_SUCCESS:
      return { ...state, loading: false, listItems: action.payload};
    case SELECTED_PIN:
      return { ...state, selectedPin: action.payload};
    case FETCHING_EVENT_IMAGES:
      return { ...state, imageLoading: true};
    case FETCHING_EVENT_IMAGES_SUCCESS:
      return { ...state, eventImage: action.payload, imageLoading: false};
    case SELECTED_IMAGE:
      return { ...state, imageSelected: action.payload, length: true };
    case CLEAR_IMAGE:
      return { ...state, imageSelected: '', length: false}
    default:
      return state;
  }
};