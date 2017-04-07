import axios from 'axios';
import { browserHistory } from 'react-router';
import actionTypes from '../actionTypes';

export default (details) => {
  const token = window.localStorage.getItem('token');
  return (dispatch) => {
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
        browserHistory.push('/roles');
      }).catch((err) => {
        dispatch({
          type: actionTypes.ROLE_CREATE_FAILED,
          status: 'failed',
          error: err.message
        });
      });
  };
};


