import {
  FETCHING_IMAGES,
  FETCHING_IMAGES_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  loading:false,
  listItems: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case  FETCHING_IMAGES:
      return { ...state, loading: true};
    case FETCHING_IMAGES_SUCCESS:
      return { ...state, loading: false, listItems: action.payload};
    default:
      return state;
  }
};