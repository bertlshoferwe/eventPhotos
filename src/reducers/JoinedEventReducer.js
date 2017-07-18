import {
  FETCHING_EVENTS,
  FETCHING_JOINED_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  loading:false,
  listItems: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case  FETCHING_EVENTS:
      return { ...state, loading: true};
    case FETCHING_JOINED_SUCCESS:
      return { ...state, loading: false, listItems: action.payload};
    default:
      return state;
  }
};