import * as actionTypes from '../actionTypes/sessions';
import merge from 'lodash.merge';

const initialState = {
  sessions: {
    loggedInUserId: null,
    loggedInUserEmail: ''
  }
};

const loginUser = (state, action) => {
  return merge({}, state, {
    sessions: {
      loggedInUserId: action.loginResult.userId,
      loggedInUserEmail: action.loginResult.userEmail
    }
  });
};

const logoutUser = (state, action) => {
  return merge({}, state, {
    sessions: {
      loggedInUserId: null,
      loggedInUserEmail: ''
    }
  });
};


export default function sessions (state = initialState, action) {
  return ({
    [actionTypes.LOGIN_USER_SUCCESS]: loginUser,
    [actionTypes.LOGOUT_USER_SUCCESS]: logoutUser
  }[action.type] || ((s) => s))(state, action);
}
