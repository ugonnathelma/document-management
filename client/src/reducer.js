import axios from 'axios';
import actionTypes from './actionTypes';

export default function reducers(state, action) {
  switch (action.type) {
    case actionTypes.LOGIN:
      return Object.assign({}, ...state, {
        isLoggedIn: true
      });
    case actionTypes.SIGNUP:
      console.log(action.payload);
      axios.post('/api/v1/users', action.payload)
        .then((response) => {
          console.log(response);
        });
    // return Object.assign({}, ...state, {
    // });
    default:
      return state;
  }
}
