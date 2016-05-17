import React, { Component } from 'react';
import { Link } from 'react-router';

import Nav from '../components/nav/nav';

class Main extends Component {
	render() {
		return (
			<div className='main-container'>
			    <Nav />
			    <div className='page'>
			    	<div>
			    		Welcome!  If you have not logged in, please do so.
			    	</div>
			    </div>
			</div>
	    )
	}
}

export default Main;
