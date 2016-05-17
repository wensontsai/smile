import * as actionTypes from '../actionTypes/notifications';

export function addNotifications (notifications) {
  return async dispatch => {
    dispatch({
      type: actionTypes.ADD_NOTIFICATIONS,
      notifications: notifications
    });
  };
}
export function clearNotifications (notifications) {
  console.log('action now', notifications);
  notifications.messagesArray.splice(0, notifications.messagesArray.length);
  return async dispatch => {
    dispatch({
      type: actionTypes.CLEAR_NOTIFICATIONS,
      notifications: notifications
    });
  };
}