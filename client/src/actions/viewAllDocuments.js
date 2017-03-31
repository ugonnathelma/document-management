import axios from 'axios';
import actionTypes from '../actions/actionTypes';
const token = window.localStorage.getItem('token');

export default function viewAllDocumentsAction() {
  return function (dispatch) {
    return axios.get('/api/v1/documents', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((documents) => {
        console.log(documents);
        dispatch({
          type: actionTypes.ALL_DOCUMENTS,
          documents
        });
      }).catch((err) => {
        dispatch({
          type: actionTypes.DOCUMENT_RETRIEVAL_FAILED,
          status: 'failed',
          error: err.message
        });
      });
  };
}

