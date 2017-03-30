import React from 'react';
import { Route, IndexRoute } from 'react-router';
import SignUpPage from './components/SignUpPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import UserProfile from './components/UserProfile.jsx';
import AdminDashBoard from './components/AdminDashBoard.jsx';
import UserDashBoard from './components/UserDashBoard.jsx';
import CreateDocument from './components/CreateDocument.jsx';
import SharedDocuments from './components/SharedDocuments.jsx';
import SearchDocuments from './components/SearchDocuments.jsx';

export default(
  <Route path="/">
    <IndexRoute component={LoginPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/register" component={SignUpPage} />
    <Route path="/dashboard" component={UserDashBoard} />
    <Route path="/admin/dashboard" component={AdminDashBoard} />
    <Route path="/shared-documents" component={SharedDocuments} />
    <Route path="/search-documents" component={SearchDocuments} />
    <Route path="/create-document" component={CreateDocument} />
    <Route path="/profile" component={UserProfile} />
  </Route>
);
