import actionTypes from '../actions/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.VIEW_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};
