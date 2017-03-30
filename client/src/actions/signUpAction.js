import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const loginSuccessful = user => ({ type: 'LOGIN_SUCCESSFUL', user });

export default function signupAction(user) {
  return function (dispatch) {
    return axios.post('/api/v1/users', user)
      .then((response) => {
        window.localStorage.setItem('token', response.data.token);
        const user = jwtDecode(response.data.token);
        dispatch(loginSuccessful(user));
      }).catch(err => console.log(err));
  };
}

