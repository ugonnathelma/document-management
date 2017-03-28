import React from 'react';
import { Route, IndexRoute } from 'react-router';
import SignUpPage from './components/SignUpPage.jsx';
import LoginPage from './components/LoginPage.jsx';

export default(
  <Route path="/">
    <IndexRoute component={LoginPage} />
    <Route path="/register" component={SignUpPage} />
  </Route>
);
