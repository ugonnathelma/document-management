import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { browserHistory, Link } from 'react-router';
import React, { Component } from 'react';
import loginAction from '../actions/authorizationManagement/loginAction';
import Header from './Header.jsx';

const ADMIN_ROLE_ID = 1;

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null,
      success: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirectIfLoggedIn = this.redirectIfLoggedIn.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.state.error = nextProps.error;
    this.state.success = nextProps.success;
    if (nextProps.token) {
      window.localStorage.setItem('token', nextProps.token);
    }
    setTimeout(() => {
      this.redirectIfLoggedIn();
    }, 1000);
  }

  componentWillMount() {
    this.redirectIfLoggedIn();
  }

  redirectIfLoggedIn (){
    const token = window.localStorage.getItem('token');
    if (token) {
      const decodedUser = jwtDecode(token);
      const roleId = decodedUser.role_id;
      if (roleId === ADMIN_ROLE_ID) {
        browserHistory.push('/admindashboard');
      } else {
        browserHistory.push('/dashboard');
      }
    }
  }

  handleSubmit(event) {
    // prevent default submit action
    event.preventDefault();

    // clear any error or success messages showing
    this.setState({
      success: null,
      error: null
    });

    this.props.login(this.state);
  }

  render() {
    return (
      <div className="row">
        <Header />
        <div className="col s2 l4 " />
        <form className="col s8 l4 loginForm" onSubmit={this.handleSubmit}>
          { this.state.error ?
            <div className="login-feedback error">
              { this.state.error }
            </div>
            : <span />
          }

          { this.state.success ?
            <div className="login-feedback success">
              { this.state.success }
            </div>
            : <span />
          }
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
    user: state.loginReducer.user,
    success: state.loginReducer.success,
    error: state.loginReducer.error,
    token: state.loginReducer.token
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: credentials => dispatch(loginAction(credentials))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(LoginPage);
