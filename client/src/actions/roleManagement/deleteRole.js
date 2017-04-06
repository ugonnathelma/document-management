import axios from 'axios';
import actionTypes from '../actionTypes';

export default (roleId) => {
  const token = window.localStorage.getItem('token');
  return (dispatch) => {
    return axios.delete(`/api/v1/roles/${roleId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        dispatch({
          type: actionTypes.ROLE_DELETED,
          roleId,
          status: 'success'
        });
      }).catch((err) => {
        dispatch({
          type: actionTypes.ROLE_DELETION_FAILED,
          status: 'failed',
          error: err.message
        });
      });
  };
};


