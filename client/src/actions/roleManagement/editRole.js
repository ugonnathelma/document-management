import axios from 'axios';
import { browserHistory } from 'react-router';
import actionTypes from '../actionTypes';

export default (details, token, roleid) => {
  return (dispatch) => {
    return axios.put(`/api/v1/roles/${roleid}`, details, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      browserHistory.push('/roles');
    }).catch((err) => {
      dispatch({
        type: actionTypes.ROLE_UPDATE_FAILED,
        status: 'failed',
        error: err.message
      });
    });
  };
};
