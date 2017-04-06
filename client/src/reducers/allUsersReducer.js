import actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

export default function allUsersReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ALL_USERS:
      return { ...state, users: action.users };
    case actionTypes.PAGINATED_USERS:
      return { ...state, users: action.users, pageCount: action.pageCount };
    case actionTypes.USER_RETRIEVAL_FAILED:
      return [...state, Object.assign({}, action.status)];
    case actionTypes.USER_UPDATED:
      const userToUpdate = state.users.find(user => user.id === action.user.id);
      const userIndex = state.users.indexOf(userToUpdate);
      const newUsers = state.users.slice();
      newUsers[userIndex] = Object.assign({}, newUsers[userIndex], action.user);
      return { ...state, users: newUsers };
    case actionTypes.USER_DELETED:
      return {
        ...state,
        users: state.users.filter((user) => {
          return user.id !== action.userid;
        })
      };
    case actionTypes.CLEAR_ALL:
      return {
        ...state,
        users: action.users
      };
    case actionTypes.FIND_USER:
      return { ...state, users: action.users, pageCount: action.pageCount };
    default:
      return state;
  }
}
