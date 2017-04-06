import axios from 'axios';
import { browserHistory } from 'react-router';
import actionTypes from '../actionTypes';
const token = window.localStorage.getItem('token');

export default function createDocumentAction(details) {
  return function (dispatch) {
    return axios.post('/api/v1/documents', details, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        dispatch({
          type: actionTypes.DOCUMENT_CREATED,
          document,
          status: 'success'
        });
        browserHistory.push('/');
      }).catch((err) => {
        dispatch({
          type: actionTypes.DOCUMENT_CREATE_FAILED,
          document,
          status: 'failed',
          error: err.message
        });
      });
  };
}

