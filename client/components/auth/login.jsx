import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { loginUser } from '../../actions/sessions';

import './auth.scss';

import Nav from '../nav/nav';
import Notifications from '../notifications/notifications';

class Login extends Component {
	constructor (props) {
	  super (props);
	  this.state = {
	    data: {
	      email: '',
	      password: ''
	    }
	  };
	}
	render () {
		const {
		  sessions,
		  notifications
		} = this.props;
		
		return (
				<div className='login-container'>
					<Nav />
					<Notifications />
					{(/(^|;)\s*token=/.test(document.cookie)
					  ? this.redirectToUsers()
					  : <div className='page'>
				    		<div className='pageTitle'>
				    			Login
				    		</div>
				    		<div className='subTitle'>
				    		Please login to view Admin Dashboard.
				    		</div>
				    		<div className='form'>
				    			<div className='form-elements'>
					    			<div>
					    				<input
					    					className='input'
					    					type='text'
					    					placeholder='email'
					    					value={this.state.data.email}
					    					onChange={ this.handleChangeEmail.bind(this) }
					    				/>
					    			</div>
					    			<div>
					    				<input
					    					className='input'
					    					type='password'
					    					placeholder='password'
					    					value={this.state.data.password}
					    					onChange={ this.handleChangePassword.bind(this) }
					    				/>
					    			</div>
					    			<div>
					    				<button className='btn btn-sm login-user'
					    				  onClick={() => this.loginUser()}
					    				  >Login
					    				</button>
					    			</div>
				    			</div>
				    		</div>
				    	</div>
					)}  	    
		    </div>
	    )
	}
	redirectToUsers () {
		browserHistory.push('/users');
	}
	handleChangeEmail (event) {
	  this.setState({
	    data: {
	      email: event.target.value,
	      password: this.state.data.password
	    }
	  });
	}
	handleChangePassword (event) {
	  this.setState({
	    data: {
	      email: this.state.data.email,
	      password: event.target.value
	    }
	  });
	}
	loginUser () {
		this.props.loginUser(this.state.data);
		this.setState({
		  data: {
		    email: '',
		    password: ''
		  }
		});
	}

}

export default connect(
  (state) => ({ sessions: state.sessions, notifications: state.notifications }),
  { loginUser }
)(Login);
