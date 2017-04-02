import actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

export default function allDocumentsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ALL_DOCUMENTS:
      return { ...state, documents: action.documents };
    case actionTypes.DOCUMENT_RETRIEVAL_FAILED:
      return [...state, Object.assign({}, action.status)];
    case actionTypes.DOCUMENT_DELETED:
      console.log(state.documents, 'delete reducer', action);
      return { ...state,
        documents: state.documents.filter((document) => {
          return document.id !== action.documentid;
        })
      };
    default:
      return state;
  }
}
