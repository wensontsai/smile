'use strict';
import 'babel-polyfill';

import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { browserHistory, Router, Route } from 'react-router';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promise from 'redux-promise';
import { Provider } from 'react-redux';
import reducers from './reducers';

// import CSS
import './entry.scss';

// Components
import Main from './pages/main';
import Login from './components/auth/login';
import Logout from './components/auth/logout';

// Middleware
const createStoreWithMiddleware = applyMiddleware(
  thunk,
  promise,
  createLogger(),
)(createStore);

const store = createStoreWithMiddleware(reducers);


ReactDOM.render(
  <Provider store={store} >
    <Router history={browserHistory} >
      <Route path='/' component={Login} />
      <Route path='/login' component={Login} />
      <Route path='/logout' component={Logout} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
