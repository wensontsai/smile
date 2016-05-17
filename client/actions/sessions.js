import * as actionTypesNotifications from '../actionTypes/notifications.js';
import * as actionTypes from '../actionTypes/sessions.js';
import { get, post, del } from '../utils/api';
import { Link, browserHistory } from 'react-router';

var Api = require('../utils/api');


export function loginUser (data) {
  return async dispatch => {
    try {
      const loginResult = await post('/api/loginUser', data);  
      if (loginResult.success === true) {
        const ms_to_add = loginResult.expiresIn.split('h')[0] * 3600000;
        const now = new Date();
        
        now.setTime(now.getTime() + ms_to_add);

        // set Token as cookie
        document.cookie = 'token=' +loginResult.token+ '; expires=' +now.toUTCString() ;
        // set LocalStorage for UI display in case of refresh
        localStorage.setItem('loggedInEmail', data.email);
        // redirect to Users page
        browserHistory.push('/users');

      } else {
        console.log(loginResult.message);
      }

      dispatch({
        type: actionTypes.LOGIN_USER_SUCCESS,
        loginResult: loginResult
      });

    } catch(e) {
      const notifications = e.error;
      console.log('sessions action thing->',notifications);
      dispatch({
        type: actionTypes.LOGIN_USER_ERROR,
        ERROR: e
      }),
      dispatch({
        type: actionTypesNotifications.ADD_NOTIFICATIONS,
        notifications: notifications
      });
    }
  };
}

export function logoutUser (data) {
  return async dispatch => {
    try {
      const logoutResult = await post('/api/logoutUser', data);
      if (logoutResult.success === true) {
        // Remove cookie on logout success
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
        // remove localStorage variables for UI display
        localStorage.removeItem('loggedInEmail');

        // redirect to Users page
        browserHistory.push('/login');
      }

      dispatch({
        type: actionTypes.LOGOUT_USER_SUCCESS,
        logoutResult: logoutResult
      });
    } catch(e) {
      dispatch({
        type: actionTypes.LOGOUT_USER_ERROR,
        ERROR: e
      });
    }
  };
}

