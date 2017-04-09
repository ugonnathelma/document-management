import axios from 'axios';
import actionTypes from '../actionTypes';

export default (token, offset, limit) => {
  return (dispatch) => {
    return axios.get(`/api/v1/documents?limit=${limit}&offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log(response);
        dispatch({
          type: actionTypes.PAGINATED_DOCUMENTS,
          documents: response.data.documents,
          pageCount: response.data.pageCount
        });
      }).catch((err) => {
        console.log(err);
        dispatch({
          type: actionTypes.DOCUMENT_RETRIEVAL_FAILED,
          status: 'failed',
          error: err.message
        });
      });
  };
};


