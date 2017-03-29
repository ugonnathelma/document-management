import actionTypes from './actionTypes';

export const createEvent = (dispatch, state) => {
  dispatch({
    type: actionTypes.SIGNUP,
    payload: state
  });
};

export const loginEvent = (dispatch, state) => {
  dispatch({
    type: actionTypes.LOGIN,
    payload: state
  });
};
