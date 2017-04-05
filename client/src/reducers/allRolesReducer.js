import actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

export default function allRolesReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ALL_ROLES:
      return { ...state, roles: action.roles };
    case actionTypes.ROLE_RETRIEVAL_FAILED:
      return [...state, Object.assign({}, action.status)];
    case actionTypes.ROLE_DELETED:
      return {
        ...state,
        roles: state.roles.filter((role) => {
          return role.id !== action.roleid;
        })
      };
    case actionTypes.CLEAR_ALL:
      return {
        ...state,
        roles: action.roles
      };
    case actionTypes.FIND_ROLE:
      return { ...state, roles: action.roles, pageCount: action.pageCount };
    default:
      return state;
  }
}
