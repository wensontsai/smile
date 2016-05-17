import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { logoutUser } from '../../actions/sessions';

import './auth.scss';

import Nav from '../nav/nav';

class Logout extends Component {
  constructor (props) {
    super (props);
  }
  componentWillMount () {
    this.logoutUser ();
  }
  render () {
    const {
      sessions
    } = this.props;

    return (
      <div className='login-container'>
        <Nav />
      </div>
      )
  }
  logoutUser () {
    this.props.logoutUser(this.props.data);
  }

}

export default connect(
  (state) => ({ sessions: state.sessions }),
  { logoutUser }
)(Logout);
