import axios from 'axios';
import actionTypes from '../actions/actionTypes';

export default function paginateDocumentAction(token, offset, limit) {
  console.log(offset, limit, 'paginate');
  return function (dispatch) {
    return axios.get(`/api/v1/documents?limit=${limit}&offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log(response);
        dispatch({
          type: actionTypes.PAGINATED_DOCUMENTS,
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

