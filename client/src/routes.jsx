import React from 'react';
import { Route, IndexRoute } from 'react-router';
import SignUpPage from './components/SignUpPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import UserDashBoard from './components/UserDashBoard.jsx';
import CreateDocument from './components/CreateDocument.jsx';
import EditDocument from './components/EditDocument.jsx';
import ViewDocument from './components/ViewDocument.jsx';
import ViewAllRoles from './components/ViewAllRoles.jsx';
import ViewAllUsers from './components/ViewAllUsers.jsx';
import CreateRole from './components/CreateRole.jsx';

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
    <Route path="/create-role" component={CreateRole} />
    <Route path="/users" component={ViewAllUsers} />
    <Route path="/roles" component={ViewAllRoles} />
  </Route>
);
