import actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

export default function allDocumentsReducer(state = initialState.documents, action) {
  switch (action.type) {
    case actionTypes.ALL_DOCUMENTS:
      return [...state, Object.assign({}, action.documents)];
    case actionTypes.DOCUMENT_RETRIEVAL_FAILED:
      return [...state, Object.assign({}, action.status)];
    default:
      return state;
  }
}
