import axios from 'axios';
import actionTypes from '../actionTypes';

export default function editUserAction(token, userData, userid) {
  return function (dispatch) {
    return axios.put(`/api/v1/users/${userid}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        dispatch({
          type: actionTypes.USER_UPDATED,
          document: response.data
        });
      }).catch((err) => {
        dispatch({
          type: actionTypes.USER_UPDATE_FAILED,
          status: 'failed',
          error: err.message
        });
      });
  };
}

