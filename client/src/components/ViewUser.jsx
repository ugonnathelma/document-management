import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import jwtDecode from 'jwt-decode';
import React, { Component, PropTypes } from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import viewUserAction from '../actions/userManagement/viewUser.js';

class ViewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      role: '',
      id: jwtDecode(window.localStorage.getItem('token')).user.id,
      pageId: parseInt(props.params.id, 10)
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    console.log(this.state, this.props, "issa log");
    if (!window.localStorage.getItem('token')) {
      browserHistory.push('/');
    }
    const token = window.localStorage.getItem('token');
    if (token) {
      this.setState({ userid: jwtDecode(token).user.id });
      this.props.viewUser(token, this.props.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.user);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div className="row dashboardContainer col s12">
        <Header />
        <Sidebar />
        <div className="col s12 workspace ">
          <div className="row workspace-header"><h4>Profile</h4></div>
          <div className="doc_list z-depth-4 panel doc_content">
            <form className="userProfile" autoComplete="off">
              <div className="row">
                <label htmlFor="username">Username: </label>
                <span>{this.state.username}</span>
              </div>
              <div className="row">
                <label htmlFor="email">Email: </label>
                <span>{this.state.email}</span>
              </div>
              <div className="row">
                <label htmlFor="first_name">First Name: </label>
                <span>{this.state.first_name}</span>
              </div>
              <div className="row">
                <label htmlFor="last_name">Last Name: </label>
                <span>{this.state.last_name}</span>
              </div>
              {this.state.id === this.state.pageId ? (
                <div className="row">
                  <label htmlFor="password">Password: </label>
                  <span>******** {this.state.id} {this.state.pageId}</span>
                </div>
              ) : <span />}

              <div className="row">
                <label htmlFor="role">Role: </label>
                <span className="userRole">{this.state.role}</span>
              </div>

              {this.state.id === this.state.pageId ?
                <div className="row">
                  <Link
                    to="/edit-profile"
                    className="btn updateUser"
                  >Edit</Link>
                </div>
               : <span />}
            </form>
            <div />
          </div>
        </div>
      </div>

    );
  }
}


ViewUser.propTypes = {
  viewUser: PropTypes.func.isRequired
};

const mapStoreToProps = (state, ownProps) => {
  return {
    user: state.viewUserReducer.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    viewUser: (usertoken, userid) => dispatch(viewUserAction(usertoken, userid))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(ViewUser);

