import React from 'react';
import { Route, IndexRoute } from 'react-router';
import SignUpPage from './components/SignUpPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import AdminDashBoard from './components/AdminDashBoard.jsx';
import UserDashBoard from './components/UserDashBoard.jsx';
import CreateDocument from './components/CreateDocument.jsx';
import EditDocument from './components/EditDocument.jsx';
import ViewDocument from './components/ViewDocument.jsx';

export default(
  <Route path="/">
    <IndexRoute component={LoginPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/register" component={SignUpPage} />
    <Route path="/dashboard" component={UserDashBoard} />
    <Route path="/admindashboard" component={UserDashBoard} />
    <Route path="/create-document" component={CreateDocument} />
    <Route path="/edit-document/:id" component={EditDocument} />
    <Route path="/view-document/:id" component={ViewDocument} />
  </Route>
);
