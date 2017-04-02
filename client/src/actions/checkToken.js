import axios from 'axios';
import { browserHistory } from 'react-router';

export const documentCreated = document => ({ type: 'DOCUMENT_CREATED', document });
const token = window.localStorage.getItem('token');

const redirect = () => {
  browserHistory.push('/');
};


export default function checkTokenAction() {
  return function (dispatch) {
    return token ? axios.get('/api/v1/tokenHealth', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        // do nothing
      }).catch(error => redirect())
      : redirect();
  };
}

