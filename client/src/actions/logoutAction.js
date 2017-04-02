import axios from 'axios';
import jwtDecode from 'jwt-decode';
import actionTypes from './actionTypes';

export default function loginAction() {
  return function (dispatch) {
    dispatch({
      type: actionTypes.CLEAR_ALL,
      documents: []
    });
  };
}

