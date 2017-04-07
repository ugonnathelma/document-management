import axios from 'axios';
import { browserHistory } from 'react-router';

const redirect = () => {
  browserHistory.push('/');
};


export default () => {
  const token = window.localStorage.getItem('token');
  return () => {
    return token ? axios.get('/api/v1/tokenHealth', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        // do nothing
      }).catch(() => redirect())
      : redirect();
  };
};


