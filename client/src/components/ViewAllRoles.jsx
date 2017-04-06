import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import jwtDecode from 'jwt-decode';
import React, { Component } from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import RoleList from '../components/RoleList.jsx';
import viewAllRolesAction from '../actions/roleManagement/viewAllRoles.js';
import deleteRoleAction from '../actions/roleManagement/deleteRole.js';

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
      this.props.viewRoles(this.state.token);
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
          <div className="row workspace-header">
            <h4 className="col s8">All Roles</h4></div>
          <RoleList
            deleteRole={this.props.deleteRole}
            roles={this.props.roles || []}
          />
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
    deleteRole: roleid => dispatch(deleteRoleAction(roleid)),
    viewRoles: usertoken => dispatch(viewAllRolesAction(usertoken))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(ViewAllRoles);

