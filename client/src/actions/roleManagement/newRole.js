import axios from 'axios';
import { browserHistory } from 'react-router';
import actionTypes from '../actionTypes';
const token = window.localStorage.getItem('token');

export default function createRoleAction(details) {
  return function (dispatch) {
    return axios.post('/api/v1/roles', details, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((role) => {
        dispatch({
          type: actionTypes.ROLE_CREATED,
          role,
          status: 'success'
        });
        browserHistory.push('/');
      }).catch((err) => {
        dispatch({
          type: actionTypes.ROLE_CREATE_FAILED,
          status: 'failed',
          error: err.message
        });
      });
  };
}

