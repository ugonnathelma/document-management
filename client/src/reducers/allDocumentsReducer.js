import actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

export default function allDocumentsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ALL_DOCUMENTS:
      return { ...state, documents: action.documents };
    case actionTypes.PAGINATED_DOCUMENTS:
      return { ...state, documents: action.documents, pageCount: action.pageCount };
    case actionTypes.FIND_DOCUMENT:
      return { ...state, documents: action.documents, pageCount: action.pageCount };
    case actionTypes.DOCUMENT_RETRIEVAL_FAILED:
      return [...state, Object.assign({}, action.status)];
    case actionTypes.DOCUMENT_DELETED:
      return { ...state,
        documents: state.documents.filter((document) => {
          return document.id !== action.documentid;
        })
      };
    case actionTypes.VIEW_DOCUMENT:
      return { ...state, document: action.document };
    case actionTypes.DOCUMENT_CREATED:
      return { ...state, createStatus: action.status, documents: action.documents };
    case actionTypes.DOCUMENT_CREATE_FAILED:
      return { ...state, status: action.status };
    case actionTypes.CLEAR_ALL:
      return { ...state,
        documents: action.documents
      };
    default:
      return state;
  }
}
