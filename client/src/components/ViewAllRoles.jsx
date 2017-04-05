import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import { Pagination } from 'react-materialize';
import jwtDecode from 'jwt-decode';
import React, { Component } from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import RoleList from '../components/RoleList.jsx';
import viewAllRolesAction from '../actions/viewAllRoles.js';
import deleteRoleAction from '../actions/deleteRole.js';
import paginateRoleAction from '../actions/paginateRole.js';
import searchRoleAction from '../actions/searchRole.js';

class ViewAllRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      searchTerms: '',
      token: window.localStorage.getItem('token')
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchRole = this.searchRole.bind(this);
    this.refreshRoles = this.refreshRoles.bind(this);
  }

  componentWillMount() {
    if (this.state.token) {
      this.setState({ userid: jwtDecode(this.state.token).user.id });
      const offset = 0;
      this.props.paginateRoles(this.state.token, offset, this.state.limit);
    }
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  searchRole() {
    this.props.searchRole(this.state.token, this.state.searchTerms);
  }

  refreshRoles() {
    const offset = 0;
    this.props.paginateRoles(this.state.token, offset, this.state.limit);
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
          <div className="row workspace-header"><h4 className="col s8">All Users</h4><div className="col s4">
            <input
              className="col s10"
              type="text"
              id="searchTerms"
              name="searchTerms"
              placeholder="Search..."
              onChange={this.handleChange}
            /><button className="btn col s2" onClick={this.searchRole}><i className="material-icons">search</i></button></div></div>
            <div className="col m10"></div><div className="col m2"><Link onClick={this.refreshRoles}><i className="material-icons  refresh-list-btn">settings_backup_restore</i></Link></div>
          <RoleList deleteRole={this.props.deleteRole} userid={this.state.userid} roles={this.props.paginated || this.props.roles} />
          <center>
            <Pagination
              items={this.props.pageCount}
              onSelect={(page) => {
                const token = window.localStorage.getItem('token');
                const offset = (page - 1) * this.state.limit;
                this.props.paginateRoles(token, offset, this.state.limit);
              }}
            />
          </center>
        </div>
      </div>
    );
  }
}


ViewAllRoles.PropTypes = {
  roles: React.PropTypes.array.isRequired,
  paginateRoles: React.PropTypes.func.isRequired
};

const mapStoreToProps = (state) => {
  return {
    roles: state.allRolesReducer.roles,
    pageCount: state.allRolesReducer.pageCount,
    paginated: state.allRolesReducer.paginated
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteRole: (usertoken, roleid) => dispatch(deleteRoleAction(usertoken, roleid)),
    viewRoles: usertoken => dispatch(viewAllRolesAction(usertoken)),
    paginateRoles: (usertoken, offset, limit) => dispatch(paginateRoleAction(usertoken, offset, limit)),
    searchRole: (usertoken, roleName) => dispatch(searchRoleAction(usertoken, roleName))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(ViewAllRoles);

