import axios from 'axios';
import jwtDecode from 'jwt-decode';
import actionTypes from '../actions/actionTypes';

export default function viewDocumentAction(token, documentid) {
  return function (dispatch) {
    return axios.get(`/api/v1/documents/${documentid}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log(response, 'response');
        dispatch({
          type: actionTypes.VIEW_DOCUMENT,
          document: response.data
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

