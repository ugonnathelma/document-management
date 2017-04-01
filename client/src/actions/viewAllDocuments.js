import axios from 'axios';
import jwtDecode from 'jwt-decode';
import actionTypes from '../actions/actionTypes';

export default function viewAllDocumentsAction(token) {
  return function (dispatch) {
    return axios.get('/api/v1/documents', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log(response);
        dispatch({
          type: actionTypes.ALL_DOCUMENTS,
          documents: response.data
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

