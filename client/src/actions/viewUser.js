import axios from 'axios';
import actionTypes from '../actions/actionTypes';

export default function viewUserAction(token, userid) {
  return function (dispatch) {
    return axios.get(`/api/v1/users/${userid}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        dispatch({
          type: actionTypes.VIEW_USER,
          document: response.data
        });
      }).catch((err) => {
        dispatch({
          type: actionTypes.USER_RETRIEVAL_FAILED,
          status: 'failed',
          error: err.message
        });
      });
  };
}

