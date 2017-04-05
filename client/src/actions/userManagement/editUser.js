import axios from 'axios';
import { browserHistory } from 'react-router';
import actionTypes from '../actionTypes';


export default function editUserAction(token, userData, userid) {
  return function (dispatch) {
    return axios.put(`/api/v1/users/${userid}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        dispatch({
          type: actionTypes.USER_UPDATED
        });
        browserHistory.push('/users');
      }).catch((err) => {
        dispatch({
          type: actionTypes.USER_UPDATE_FAILED,
          status: 'failed',
          error: err.message
        });
      });
  };
}

