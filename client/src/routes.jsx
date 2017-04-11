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
import About from './components/About.jsx';
import EditRole from './components/EditRole.jsx';
import Profile from './components/ViewUser.jsx';
import EditProfile from './components/EditUser.jsx';
import ChangePassword from './components/changePassword.jsx';

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
    <Route path="/edit-role/:id" component={EditRole} />
    <Route path="/users" component={ViewAllUsers} />
    <Route path="/roles" component={ViewAllRoles} />
    <Route path="/about" component={About} />
    <Route path="/profile/:id" component={Profile} />
    <Route path="/edit-profile" component={EditProfile} />
    <Route path="/change-password" component={ChangePassword} />
  </Route>
);
