import axios from 'axios';
import { browserHistory } from 'react-router';
import actionTypes from '../actions/actionTypes';
export const documentCreated = document => ({ type: 'DOCUMENT_CREATED', document });

export default function editDocumentAction(details, token, documentid) {
  return function (dispatch) {
    return axios.put(`/api/v1/documents/${documentid}`, details, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        dispatch({
          type: actionTypes.DOCUMENT_UPDATED,
          document,
          status: 'success'
        });
        browserHistory.push('/');
      }).catch((err) => {
        dispatch({
          type: actionTypes.DOCUMENT_UPDATE_FAILED,
          document,
          status: 'failed',
          error: err.message
        });
      });
  };
}

