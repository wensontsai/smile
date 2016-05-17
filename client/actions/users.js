import * as actionTypes from '../actionTypes/users.js';
import { get, post, del } from '../utils/api';

var Api = require('../utils/api');

export function queryAllUsers () {
  return async dispatch => {
    try {
      const queryResult = await get('/api/queryAllUsers');
      dispatch({
        type: actionTypes.QUERY_ALL_USERS_SUCCESS,
        queryResult: queryResult
      });

    } catch(e) {
      dispatch({
        type: actionTypes.QUERY_ALL_USERS_ERROR,
        ERROR: e
      });
    }
  };
}

export function addUser (data) {
  return async dispatch => {
    try {
      const addResult = await post('/api/addUser', data);
      dispatch({
        type: actionTypes.ADD_USER_SUCCESS
      });

      const queryResult = await get('/api/queryAllUsers');
      dispatch({
        type: actionTypes.QUERY_ALL_USERS_SUCCESS,
        queryResult: queryResult
      });

    } catch(e) {
      dispatch({
        type: actionTypes.ADD_USER_ERROR,
        ERROR: e
      }),
      dispatch({
        type: actionTypes.QUERY_ALL_USERS_ERROR,
        ERROR: e
      });
    }
  };
}

export function sendEmail (userId) {
  return async dispatch => {
    try {
      const data = {
        data: {
          userId: userId
        }
      }
      const addResult = await post('/api/initializeExam', data);
      dispatch({
        type: actionTypes.SEND_EMAIL_SUCCESS
      });

      const queryResult = await get('/api/queryAllUsers');
      dispatch({
        type: actionTypes.QUERY_ALL_USERS_SUCCESS,
        queryResult: queryResult
      });

    } catch(e) {
      dispatch({
        type: actionTypes.SEND_EMAIL_ERROR,
        ERROR: e
      }),
      dispatch({
        type: actionTypes.QUERY_ALL_USERS_ERROR,
        ERROR: e
      });
    }
  };
}