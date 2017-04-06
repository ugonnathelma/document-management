import axios from 'axios';
import { browserHistory } from 'react-router';
import actionTypes from '../actionTypes';

export default function deleteDocumentAction(documentid) {
  const token = window.localStorage.getItem('token');
  return function (dispatch) {
    return axios.delete(`/api/v1/documents/${documentid}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        dispatch({
          type: actionTypes.DOCUMENT_DELETED,
          status: 'success'
        });
        browserHistory.push('/');
      }).catch((err) => {
        dispatch({
          type: actionTypes.DOCUMENT_DELETION_FAILED,
          status: 'failed',
          error: err.message
        });
      });
  };
}

