import axios from 'axios';
import jwtDecode from 'jwt-decode';
import actionTypes from '../actionTypes';

export const loginSuccessful = user => ({ type: 'LOGIN_SUCCESSFUL', user });

export default (userData) => {
  return (dispatch) => {
    return axios.post('/api/v1/users', userData)
      .then((response) => {
        window.localStorage.setItem('token', response.data.token);
        const user = jwtDecode(response.data.token);
        dispatch({
          type: actionTypes.LOGIN_SUCCESSFUL,
          user
        });
      }).catch((err) => {
        dispatch({
          type: actionTypes.SIGNUP_FAILED,
          message: err.response.data.error
        });
      });
  };
};


