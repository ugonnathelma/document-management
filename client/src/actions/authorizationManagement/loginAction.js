import axios from 'axios';
import jwtDecode from 'jwt-decode';
import actionTypes from '../actionTypes';

export default function loginAction(credentials) {
  return function (dispatch) {
    return axios.post('/api/v1/users/login', credentials)
      .then((response) => {
        const token = response.data.token;
        const user = jwtDecode(token).user;
        dispatch({
          type: actionTypes.LOGIN_SUCCESSFUL,
          user,
          token,
          message: 'Login Successful'
        });
      }).catch((error) => {
        dispatch({
          type: actionTypes.LOGIN_ERROR,
          message: error.response.data.error
        });
      });
  };
}

