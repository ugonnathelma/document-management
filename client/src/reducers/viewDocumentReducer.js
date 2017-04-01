import actionTypes from '../actions/actionTypes';

export default function viewDocumentReducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.VIEW_DOCUMENT:
      return { ...state, document: action.document };
    default:
      return state;
  }
}
