import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const loginSuccessful = user => ({ type: 'LOGIN_SUCCESSFUL', user });

export default function loginAction(credentials) {
  return function (dispatch, getState) {
    return axios.post('/api/v1/users/login', credentials)
      .then((response) => {
        window.localStorage.setItem('token', response.data.token);
        const user = jwtDecode(response.data.token);
        dispatch(loginSuccessful(user));
      }).catch(error => console.log(error));
  };
}

