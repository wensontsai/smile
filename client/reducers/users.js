import * as actionTypes from '../actionTypes/users';
import merge from 'lodash.merge';

const initialState = {
  users: {
    usersAll: [],
    actionStatus: ''
  }
};

const queryAllUsers = (state, action) => {
  return merge({}, state, {
    users: {
      usersAll: action.queryResult,
      actionStatus: 'queryAllUsers successful!'
    }
  });
};

const addUser = (state, action) => {
  return merge({}, state, {
    users: {
      usersAll: action.queryResult,
      actionStatus: 'Adding User Successful!'
    }
  });
};


export default function users (state = initialState, action) {
  return ({
    [actionTypes.QUERY_ALL_USERS_SUCCESS]: queryAllUsers,
    [actionTypes.ADD_USER_SUCCESS]: addUser,
  }[action.type] || ((s) => s))(state, action);
}
