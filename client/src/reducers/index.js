import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import signUpReducer from './signUpReducer';
import newDocumentReducer from './newDocumentReducer';
import allDocumentsReducer from './allDocumentsReducer';
import viewDocumentReducer from './viewDocumentReducer';
import allUsersReducer from './allUsersReducer';

const rootReducer = combineReducers({
  loginReducer,
  signUpReducer,
  newDocumentReducer,
  allDocumentsReducer,
  viewDocumentReducer,
  allUsersReducer
});

export default rootReducer;

