import actionTypes from '../actionTypes';

export default function createEvent(dispatch, state) {
  dispatch({
    type: actionTypes.SIGNUP,
    payload: state
  });
}
