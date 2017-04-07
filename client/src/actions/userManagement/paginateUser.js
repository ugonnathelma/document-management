import axios from 'axios';
import actionTypes from '../actionTypes';

export default (token, offset, limit) => {
  return (dispatch) => {
    return axios.get(`/api/v1/users?limit=${limit}&offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        dispatch({
          type: actionTypes.PAGINATED_USERS,
          users: response.data.users,
          pageCount: response.data.pageCount
        });
      }).catch((err) => {
        dispatch({
          type: actionTypes.USER_RETRIEVAL_FAILED,
          status: 'failed',
          error: err.message
        });
      });
  };
};


