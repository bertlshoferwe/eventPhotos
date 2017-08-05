import {
  FETCHING_IMAGES,
  FETCHING_IMAGES_SUCCESS,
  SELECTED_PIN
} from '../actions/types';

const INITIAL_STATE = {
  loading:false,
  listItems: '',
  selectedPin: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case  FETCHING_IMAGES:
      return { ...state, loading: true};
    case FETCHING_IMAGES_SUCCESS:
      return { ...state, loading: false, listItems: action.payload};
    case SELECTED_PIN:
      return { ...state, selectedPin: action.payload};
    default:
      return state;
  }
};