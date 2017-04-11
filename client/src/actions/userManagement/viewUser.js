import axios from 'axios';
import actionTypes from '../actionTypes';

export default (token, userid) => {
  return (dispatch) => {
    return axios.get(`/api/v1/users/${userid}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        dispatch({
          type: actionTypes.VIEW_USER,
          user: response.data
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


