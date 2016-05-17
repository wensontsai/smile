import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import Nav from '../nav/nav';
import Notifications from '../notifications/notifications';
import AddUser from './addUser';
import UsersList from './usersList';

import './users.scss';

class Users extends Component {
  render () {
    const {
      users,
      notifications
    } = this.props;

    return (
        <div className='display-all-container'>
            <Nav />
            <Notifications />
            {(/(^|;)\s*token=/.test(document.cookie)
              ? <div className='page'>
                  <AddUser />
                  <UsersList />
                </div>
              :  this.redirectToLogin()
            )}   
        </div>
    );
  }
  redirectToLogin () {
    browserHistory.push('/login');
  }
}

export default connect(
  (state) => ({ users: state.users, notifications: state.notifications }),
  {}
)(Users);