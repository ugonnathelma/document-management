import axios from 'axios';
import actionTypes from '../actionTypes';

export default function getRoleTitleAction(roleid) {
  const token = window.localStorage.getItem('token');
  return function (dispatch) {
    return axios.get(`/api/v1/roles/${roleid}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        dispatch({
          type: actionTypes.FIND_ROLE,
          roles: response.data.roles
        });
      }).catch((err) => {
        dispatch({
          type: actionTypes.ROLE_RETRIEVAL_FAILED,
          status: 'failed',
          error: err.message
        });
      });
  };
}
