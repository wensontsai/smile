import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { clearNotifications } from '../../actions/notifications';

import './notifications.scss';

  class Notifications extends Component {
    constructor (props) {
      super(props);
      this.state = {
        items: []
      }
    }
    componentDidMount () {
      console.log(this.props);
    }
    handleRemove () {
      this.props.clearNotifications(this.props.notifications);
    }

    render () {
      const items = this.props.notifications.messagesArray.map(function(item, i) {
          return (
            <div className='item' key={i} onClick={this.handleRemove.bind(this, i)}>
              <div className='message'>
                {item}
              </div>
              <a className='boxclose' id='boxclose'></a>
            </div>
          );
        }.bind(this));

        return (
          <div className='notifications-container'>
            <ReactCSSTransitionGroup
              transitionName='example'
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
            >
              {items}
            </ReactCSSTransitionGroup>
          </div>
        );
    }

  }

  export default connect(
    (state) => ({ notifications: state.notifications }),
    { clearNotifications }
  )(Notifications);







