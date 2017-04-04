import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { browserHistory, Link } from 'react-router';
import React, { Component } from 'react';
import loginAction from '../actions/loginAction';
import Header from './Header.jsx';


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.Login(this.state)
      .then(() => {
        const decodedRole = jwtDecode(window.localStorage.getItem('token'))
          .user.role_id;
        if (decodedRole === 1) { browserHistory.push('/admindashboard'); } else {
          browserHistory.push('/dashboard');
        }
      });
  }

  render() {
    if (window.localStorage.getItem('token')) {
      const decodedRole = jwtDecode(window.localStorage.getItem('token'))
        .user.role_id;
      if (decodedRole === 1) { browserHistory.push('/admindashboard'); } else {
        browserHistory.push('/dashboard');
      }
    }
    return (
      <div className="row">
        <Header />
        <div className="col s2 l4 " />
        <form className="col s8 l4 loginForm" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <input
                className="validate"
                type="email"
                name="email"
                id="email"
                onChange={this.handleChange}
              />
              <label htmlFor="email">Enter your email</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                className="validate"
                type="password"
                name="password"
                id="password"
                onChange={this.handleChange}
              />
              <label htmlFor="password">Enter your password</label>
            </div>

            <div>
              <span className="changeLogin">New User? <Link to="/register">Register Here</Link></span>
            </div>
          </div>
          <label className="loginError" id="loginError"></label>

          <br />
          <center>
            <div className="row">
              <button
                type="submit"
                name="btn_login"
                id="btn_login"
                onClick={this.handleSubmit}
                className="col s12 btn btn-large waves-effect amber accent-2"
              >
                Login
                </button>
            </div>
          </center>
        </form>
        <div className="col s2 l4" />
      </div>

    );
  }
}

LoginPage.PropTypes = {
  user: React.PropTypes.object.isRequired,
  loginThings: React.PropTypes.func.isRequired
};

LoginPage.contextTypes = {
  router: React.PropTypes.object
};

const mapStoreToProps = (state) => {
  return {
    user: state.user
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    Login: credentials => dispatch(loginAction(credentials))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(LoginPage);
