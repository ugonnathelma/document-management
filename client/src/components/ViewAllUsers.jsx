import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import { Pagination } from 'react-materialize';
import jwtDecode from 'jwt-decode';
import React, { Component } from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import UserList from '../components/UserList.jsx';
import viewAllUsersAction from '../actions/viewAllUsers.js';
import deleteUserAction from '../actions/deleteUser.js';
import paginateUserAction from '../actions/paginateUser.js';
import searchUserAction from '../actions/searchUser.js';

class ViewAllUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      searchTerms: '',
      token: window.localStorage.getItem('token')
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchUser = this.searchUser.bind(this);
    this.refreshUsers = this.refreshUsers.bind(this);
  }

  componentWillMount() {
    if (this.state.token) {
      this.setState({ userid: jwtDecode(this.state.token).user.id });
      const offset = 0;
      this.props.paginateUsers(this.state.token, offset, this.state.limit);
    }
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  searchUser() {
    this.props.searchUser(this.state.token, this.state.searchTerms);
  }

  refreshUsers() {
    const offset = 0;
    this.props.paginateUsers(this.state.token, offset, this.state.limit);
  }

  render() {
    if (!window.localStorage.getItem('token')) {
      browserHistory.push('/');
    }
    return (
      <div className="row dashboardContainer col s12">
        <Header />
        <Sidebar />
        <div className="col s12 workspace ">
          <div className="row workspace-header">
            <h4 className="col s8">All Users</h4><div className="col s4">
              <input
                className="col s10"
                type="text"
                id="searchTerms"
                name="searchTerms"
                placeholder="Search..."
                onChange={this.handleChange}
              /><button className="btn col s2" onClick={this.searchUser}>
                <i className="material-icons">search</i></button></div></div>
          <div className="col m10" /><div className="col m2">
            <Link onClick={this.refreshUsers}>
              <i className="material-icons  refresh-list-btn">
                settings_backup_restore</i></Link></div>
          <UserList
            deleteUser={this.props.deleteUser}
            userid={this.state.userid} users={this.props.users || []}
          />
          <center>
            <Pagination
              items={this.props.pageCount}
              onSelect={(page) => {
                const token = window.localStorage.getItem('token');
                const offset = (page - 1) * this.state.limit;
                this.props.paginateUsers(token, offset, this.state.limit);
              }}
            />
          </center>
        </div>
      </div>
    );
  }
}


ViewAllUsers.PropTypes = {
  users: React.PropTypes.array.isRequired,
  paginateUsers: React.PropTypes.func.isRequired
};

const mapStoreToProps = (state) => {
  return {
    users: state.allUsersReducer.users,
    pageCount: state.allUsersReducer.pageCount,
    paginated: state.allUsersReducer.paginated
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (usertoken, userid) => dispatch(deleteUserAction(usertoken, userid)),
    viewUsers: usertoken => dispatch(viewAllUsersAction(usertoken)),
    paginateUsers: (usertoken, offset, limit) => dispatch(paginateUserAction(usertoken, offset, limit)),
    searchUser: (usertoken, userNames) => dispatch(searchUserAction(usertoken, userNames))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(ViewAllUsers);

