import actionTypes from '../actions/actionTypes';

export default function viewUserReducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.VIEW_DOCUMENT:
      return { ...state, user: action.user };
    default:
      return state;
  }
}
