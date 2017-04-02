import actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESSFUL:
      return [...state, Object.assign({}, action.user)];
    default:
      return state;
  }
}
