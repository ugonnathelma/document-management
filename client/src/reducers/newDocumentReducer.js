import actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

export default function newDocumentReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.DOCUMENT_CREATED:
      return { ...state, status: action.status, documents: Object.assign({}, action.documents) };
    case actionTypes.DOCUMENT_CREATE_FAILED:
      return { ...state, status: action.status };
    default:
      return state;
  }
}
