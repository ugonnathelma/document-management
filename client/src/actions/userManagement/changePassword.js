import axios from 'axios';
import actionTypes from '../actionTypes';

export default (token, passwordData, userid) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.PASSWORD_UPDATED,
      status: 'updated'
    });
    return axios.put(`/api/v1/user/change-password/${userid}`, passwordData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((user) => {
        dispatch({
          type: actionTypes.PASSWORD_UPDATED,
          status: 'updated'
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.PASSWORD_UPDATE_FAILED,
          status: 'failed',
          error: err.message
        });
      });
  };
};


