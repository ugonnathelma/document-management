import React from 'react';
import { Router, browserHistory } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import routes from './routes.jsx';
import reducer from './reducers/reducer.js';


import '../stylesheet/styles.css';
import '../../node_modules/materialize-css/dist/css/materialize.css';
import '../../node_modules/materialize-css/dist/css/materialize.min.css';
import '../../node_modules/materialize-css/dist/js/materialize.min';

const store = createStore(reducer, {});
render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>
 , document.getElementById('app'));

