import axios from 'axios';
import actionTypes from '../actionTypes';

export default (token, roleName) => {
  return (dispatch) => {
    return axios.get(`/api/v1/search/roles?query=${roleName}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        dispatch({
          type: actionTypes.FIND_ROLE,
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
};

