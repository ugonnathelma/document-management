import axios from 'axios';
import actionTypes from '../actionTypes';

export default function viewAllRolesAction(token) {
  return function (dispatch) {
    return axios.get('/api/v1/roles', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        dispatch({
          type: actionTypes.ALL_ROLES,
          roles: response.data,
          pageCount: response.data.pageCount
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

