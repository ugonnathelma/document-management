import axios from 'axios';
import { browserHistory } from 'react-router';
import actionTypes from '../actions/actionTypes';

export default function deleteUserAction(userid) {
  const token = window.localStorage.getItem('token');
  return function (dispatch) {
    return axios.delete(`/api/v1/users/${userid}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        dispatch({
          type: actionTypes.USER_DELETED,
          userid,
          status: 'success'
        });
        browserHistory.push('/');
      }).catch((err) => {
        dispatch({
          type: actionTypes.USER_DELETION_FAILED,
          user,
          status: 'failed',
          error: err.message
        });
      });
  };
}

