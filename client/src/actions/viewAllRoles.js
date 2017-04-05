import axios from 'axios';
import actionTypes from '../actions/actionTypes';

export default function viewAllRolesAction(token) {
  return function (dispatch) {
    return axios.get('/api/v1/roles', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        dispatch({
          type: actionTypes.PAGINATED_ROLES,
          roles: response.data.roles,
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

