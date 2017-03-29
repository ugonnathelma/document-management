import React from 'react';
import { Route, IndexRoute } from 'react-router';
import SignUpPage from './components/SignUpPage.jsx';
import LoginPage from './components/LoginPage.jsx';
// import UserProfile from './components/UserProfile.jsx';
import AdminDashBoard from './components/AdminDashBoard.jsx';
import UserDashBoard from './components/UserDashBoard.jsx';


export default(
  <Route path="/">
    <IndexRoute component={LoginPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/register" component={SignUpPage} />
    <Route path="/dashboard" component={UserDashBoard} />
    <Route path="/admin/dashboard" component={AdminDashBoard} />
    {/*
    <Route path="/profile" component={UserProfile} />
    */}
  </Route>
);
