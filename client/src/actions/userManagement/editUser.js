import axios from 'axios';
import actionTypes from '../actionTypes';

export default (token, userData, userid) => {
  return (dispatch) => {
    return axios.put(`/api/v1/users/${userid}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        dispatch({
          type: actionTypes.USER_UPDATED,
          user: Object.assign({}, userData, {
            id: userid
          })
        });
      }).catch((err) => {
        dispatch({
          type: actionTypes.USER_UPDATE_FAILED,
          status: 'failed',
          error: err.message
        });
      });
  };
};


