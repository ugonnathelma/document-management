import axios from 'axios';
import actionTypes from '../actionTypes';

export default function searchUserAction(token, userNames) {
  return function (dispatch) {
    return axios.get(`/api/v1/search/users?query=${userNames}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        dispatch({
          type: actionTypes.FIND_USER,
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
}
