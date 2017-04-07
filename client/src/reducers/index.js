import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import signUpReducer from './signUpReducer';
import allDocumentsReducer from './allDocumentsReducer';
import allUsersReducer from './allUsersReducer';
import allRolesReducer from './allRolesReducer';

const rootReducer = combineReducers({
  loginReducer,
  signUpReducer,
  allDocumentsReducer,
  allUsersReducer,
  allRolesReducer
});

export default rootReducer;

