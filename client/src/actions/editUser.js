// import axios from 'axios';
// import actionTypes from '../actions/actionTypes';

// export default function viewDocumentAction(token, documentid) {
//   return function (dispatch) {
//     return axios.get(`/api/v1/documents/${documentid}`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     })
//       .then((response) => {
//         dispatch({
//           type: actionTypes.USER_UPDATED,
//           document: response.data
//         });
//       }).catch((err) => {
//         dispatch({
//           type: actionTypes.USER_UPDATE_FAILED,
//           status: 'failed',
//           error: err.message
//         });
//       });
//   };
// }

