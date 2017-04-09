import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router';
import React, { Component, PropTypes } from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import changePasswordAction from '../actions/userManagement/changePassword.js';
import checkTokenAction from '../actions/authorizationManagement/checkToken.js';


class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
      password_confirmation: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.props.CheckToken();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.status === 'updated') {
      swal('Password Updated!', 'Your password has been updated. Please sign in again', 'success');
      localStorage.removeItem('token');
      browserHistory.push('/');
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const token = localStorage.getItem('token');
    this.props.changePassword(token, this.state, jwtDecode(token).user.id);
  }

  render() {
    if (!window.localStorage.getItem('token')) {
      browserHistory.push('/');
    }
    return (
      <div className="row dashboardContainer col s12">
        <Header />
        <Sidebar />
        <div className="col s12 workspace">
          <div className="row workspace-header"><h4>Password Change</h4></div>
          <form onSubmit={this.handleSubmit} className="panel">
            <div className="field row">
              <div className="col m9 s12 document-name-field">
                <input
                  type="password" name="oldPassword"
                  id="oldPassword"
                  onChange={this.handleChange}
                  placeholder="Enter Old Password"
                />
              </div>
            </div>
            <div className="field row">
              <div className="col m9 s12 document-name-field">
                <input
                  type="password" name="password"
                  id="password"
                  onChange={this.handleChange}
                  placeholder="Enter New Password"
                />
              </div>
            </div>
            <div className="field row">
              <div className="col m9 s12 document-name-field">
                <input
                  type="password" name="password_confirmation"
                  id="password_confirmation"
                  onChange={this.handleChange}
                  placeholder="Enter New Password Confirmation"
                />
              </div>
            </div>
            <div className="field row">
              <button className="btn changePassword" type="submit">Change Password</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


ChangePassword.PropTypes = {
  CheckToken: PropTypes.func
};

ChangePassword.contextTypes = {
  router: PropTypes.object
};

const mapStoretoProps = (state, ownProps) => {
  return {
    status: state.allUsersReducer.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePassword: (usertoken, passwordDetails, userid) =>
    dispatch(changePasswordAction(usertoken, passwordDetails, userid)),
    CheckToken: () => dispatch(checkTokenAction())
  };
};

export default connect(mapStoretoProps, mapDispatchToProps)(ChangePassword);

