import axios from 'axios';
import actionTypes from './actionTypes';

export default function searchDocumentAction(token, documentName) {
  return function (dispatch) {
    return axios.get(`/api/v1/search/documents?query=${documentName}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log(response);
        dispatch({
          type: actionTypes.FIND_DOCUMENT,
          documents: response.data.documents,
          pageCount: response.data.pageCount
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
