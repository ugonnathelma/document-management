import React from 'react';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import configureStore from './store/configureStore.js';
import initialState from './store/initialState.js';
import routes from './routes.jsx';

import '../stylesheet/styles.scss';

const store = configureStore(initialState);

render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>
 , document.getElementById('app'));

