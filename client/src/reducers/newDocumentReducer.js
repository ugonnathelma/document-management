import actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

export default function newDocumentReducer(state = initialState.documents, action) {
  switch (action.type) {
    case actionTypes.DOCUMENT_CREATED:
      return [...state, Object.assign({}, action.documents)];
    case actionTypes.DOCUMENT_CREATE_FAILED:
      return [...state, Object.assign({}, action.status)];
    default:
      return state;
  }
}
