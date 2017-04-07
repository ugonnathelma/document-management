import axios from 'axios';
import { browserHistory } from 'react-router';
import actionTypes from '../actionTypes';

export default (documentid) => {
  const token = window.localStorage.getItem('token');
  return (dispatch) => {
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
};


