import { combineReducers } from 'redux';
import users from './users';
import sessions from './sessions';
import notifications from './notifications';

const reducers = combineReducers({
  users,
  sessions,
  notifications
});

export default reducers;
