import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import signupAction from '../actions/authorizationManagement/signUpAction';
import React, { Component } from 'react';
import Header from '../components/Header.jsx';

class SignUpPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      username: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: '',
      success: null,
      error: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.error === 'unique violation') {
    this.setState({
      error: 'User already exists'
    });
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // if (this.validateInput(this.state)) {
      this.props.Signup(this.state)
      .then(() => {
        browserHistory.push('/dashboard');
      });
    // }
  }

  render() {
    if (window.localStorage.getItem('token')) {
      browserHistory.push('/dashboard');
    }
    return (
      <div className="row">
        <Header />
        <div className="col s2 l4 " />
        <form className="col s8 l4 loginForm" onSubmit={this.handleSubmit} >
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
                type="text"
                name="username"
                id="username"
                onChange={this.handleChange}
                required
              />
              <label htmlFor="username">Username</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                className="validate"
                type="text"
                name="first_name"
                id="first_name"
                onChange={this.handleChange}
                required
              />
              <label htmlFor="first_name">Firstname</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                className="validate"
                type="text"
                name="last_name"
                id="last_name"
                onChange={this.handleChange}
                required
              />
              <label htmlFor="last_name">Lastname</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                className="validate"
                type="email"
                name="email"
                id="email"
                onChange={this.handleChange}
                required
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
                required
              />
              <label htmlFor="password">Enter your password</label>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  className="validate"
                  type="password"
                  name="password_confirmation"
                  id="password_confirmation"
                  onChange={this.handleChange}
                  required
                />
                <label htmlFor="password_confirmation">Re-enter your password</label>
              </div>
            </div>

            <div>
              <span className="changeLogin">Existing User? <Link to="/">Login Here</Link></span>
            </div>
          </div>

          <br />
          <center>
            <div className="row">
              <button
                type="submit"
                name="btn_login"
                id="btn_login"
                className="col s12 btn btn-large waves-effect amber accent-2"
              >
                Register
                </button>
            </div>
          </center>
        </form>
        <div className="col s2 l4" />
      </div>

    );
  }
}

SignUpPage.PropTypes = {
  user: React.PropTypes.object.isRequired,
  loginThings: React.PropTypes.func.isRequired
};

SignUpPage.contextTypes = {
  router: React.PropTypes.object
};

const mapStoreToProps = (state) => {
  return {
    user: state.signUpReducer.user,
    error: state.signUpReducer.error
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    Signup: userDetails => dispatch(signupAction(userDetails))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(SignUpPage);
