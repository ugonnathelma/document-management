import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import signUpReducer from './signUpReducer';
import newDocumentReducer from './newDocumentReducer';
import allDocumentsReducer from './allDocumentsReducer';

const rootReducer = combineReducers({
  loginReducer,
  signUpReducer,
  newDocumentReducer,
  allDocumentsReducer
});

export default rootReducer;

