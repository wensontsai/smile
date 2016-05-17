import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { addUser } from '../../actions/users';
import { addNotifications } from '../../actions/notifications';

import './users.scss';


class AddUserView extends Component {
  constructor (props) {
    super (props);
    this.state = {
      data: {
        firstName: this.props.firstName || '',
        lastName: this.props.lastName || '',
        email: this.props.email || '',
        admin: this.props.admin || '',
        password: this.props.password || '',
        password_confirm: this.props.password_confirm || ''
      }
    };
  }

  validateEmail (email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  render () {
    return (
      <div className='user-add-view'>
        <div className='column'>
          <div className='field'>
            <div>First Name:</div>
            <input
              type='text'
              value={this.state.data.firstName}
              onChange={ this.handleChangeFirstName.bind(this) }
            />
          </div>
          <div className='field'>
            <div>Last Name:</div>
            <input
              type='text'
              value={this.state.data.lastName}
              onChange={ this.handleChangeLastName.bind(this) }
            />
          </div>
        </div>

        <div className='column'>
          <div className='field'>
            <div>Email:</div>
            <input
              type='text'
              value={this.state.data.email}
              onChange={ this.handleChangeEmail.bind(this) }
            />
          </div>
          <div className='field admin-panel'>
            <div>Admin:</div>
              <div className='selection-section'>
                <div className='selection'>
                  <input
                    name='radio-admin-yes'
                    type='radio'
                    name='radio-admin-group'
                    onClick={ this.handleChangeAdmin.bind(this, 'Y') }
                  />
                  <label htmlFor='radio-admin-yes'>Yes</label>
                </div>
                <div className='selection'>
                  <input
                    name='radio-admin-no'
                    type='radio'
                    name='radio-admin-group'
                    onClick={ this.handleChangeAdmin.bind(this, 'N') }
                  />
                  <label htmlFor='radio-admin-no'>No</label>
                </div>
              </div>
          </div>
        </div>
        {(this.state.showStatus
          ? <div className='action-status'>
              <ReactCSSTransitionGroup transitionName='example' transitionEnterTimeout={500} transitionLeaveTimeout={300} >
                  {this.props.users.actionStatus}
              </ReactCSSTransitionGroup>
            </div>
          : ''
        )}
        <div className={(this.state.data.admin === 'Y'
            ? 'column'
            : 'column disabled'
          )}
          >
          <div className='field'>
            <div>Password:</div>
            <input    
              type='password'
              value={this.state.data.password}
              onChange={ this.handleChangePassword.bind(this) }
            />
          </div>
          <div className='field'>
            <div>Confirm Password:</div>
            <input
              type='password'
              value={this.state.data.password_confirm}
              onChange={ this.handleChangePasswordConfirm.bind(this) }
            />
          </div>
        </div>

        <div className='column-submit'>
          <div className='add-user'>
            <button className='btn btn-sm add-user'
              onClick={() => this.addUser()}
              >Add User
            </button>
          </div>
        </div>
      </div>
    );
  }
  handleChangeFirstName (event) {
    this.setState({
      data: {
        firstName: event.target.value,
        lastName: this.state.data.lastName,
        email: this.state.data.email,
        password: this.state.data.password,
        password_confirm: this.state.data.password_confirm,
        admin: this.state.data.admin
      }
    });
  }
  handleChangeLastName (event) {
    this.setState({
      data: {
        firstName: this.state.data.firstName,
        lastName: event.target.value,
        email: this.state.data.email,
        password: this.state.data.password,
        password_confirm: this.state.data.password_confirm,
        admin: this.state.data.admin
      }
    });
  }
  handleChangeEmail (event) {
    this.setState({
      data: {
        firstName: this.state.data.firstName,
        lastName: this.state.data.lastName,
        email: event.target.value,
        password: this.state.data.password,
        password_confirm: this.state.data.password_confirm,
        admin: this.state.data.admin
      }
    });
  }
  handleChangeAdmin (status, event) {
    this.setState({
      data: {
        firstName: this.state.data.firstName,
        lastName: this.state.data.lastName,
        email: this.state.data.email,
        password: this.state.data.password,
        password_confirm: this.state.data.password_confirm,
        admin: status
      }
    });
  }
  handleChangePassword (event) {
    this.setState({
      data: {
        firstName: this.state.data.firstName,
        lastName: this.state.data.lastName,
        email: this.state.data.email,
        password: event.target.value,
        password_confirm: this.state.data.password_confirm,
        admin: this.state.data.admin
      }
    });
  }
  handleChangePasswordConfirm (event) {
    this.setState({
      data: {
        firstName: this.state.data.firstName,
        lastName: this.state.data.lastName,
        email: this.state.data.email,
        password: this.state.data.password,
        password_confirm: event.target.value,
        admin: this.state.data.admin
      }
    });
  }
  addUser () {
    // validate email
    if( this.state.data.firstName ) {
      // validate email
      if( this.validateEmail(this.state.data.email) ) {
        // validate admin is chosen
        if( this.state.data.admin ) {
          // If admin, validate that passwords match
          if(this.state.data.admin === 'Y') {
            if(this.state.data.password === this.state.data.password_confirm) {
              this.props.addUser(this.state.data);
              this.setState({ data:{} });
            } else {
              const notifications = {
                messagesArray: ['Passwords do not match!   Please re-enter.']
              };
              this.props.addNotifications(notifications);
              this.setState({ data:{} });
            }
          } else {
            this.props.addUser(this.state.data);
            this.setState({ data:{} });
          }
        } else {
          const notifications = {
            messagesArray: ['Please select Admin: Y or N!']
          };
          this.props.addNotifications(notifications);
          this.setState({ data:{} });
        }
      } else {
        const notifications = {
          messagesArray: ['Please re-enter a proper email!']
        };
        this.props.addNotifications(notifications);
        this.setState({ data:{} });
      }
    } else {
      const notifications = {
        messagesArray: ['Please enter a First Name!']
      };
      this.props.addNotifications(notifications);
      this.setState({ data:{} });
    }

      // Reset radio button selections
      const allRadioButtons = document.getElementsByTagName('input');
      for (let i = 0; i < allRadioButtons.length; i++)
      {
        if (allRadioButtons[i].type == 'radio')
        {
          allRadioButtons[i].checked = false;
        }
      }

  }

}

export default connect(
  (state) => ({ users: state.users }),
  { addUser, addNotifications }
)(AddUserView);
