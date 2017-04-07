import axios from 'axios';
import actionTypes from '../actionTypes';

export default (token, offset, limit) => {
  return (dispatch) => {
    return axios.get(`/api/v1/roles?limit=${limit}&offset=${offset}`, {
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
          type: actionTypes.ROLES_RETRIEVAL_FAILED,
          status: 'failed',
          error: err.message
        });
      });
  };
};


