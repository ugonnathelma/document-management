import actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESSFUL:
      return { ...state, user: action.user, token: action.token, error: null, success: action.message };
    case actionTypes.LOGIN_ERROR:
      return { ...state, error: action.message, success: null };
    default:
      return state;
  }
}
