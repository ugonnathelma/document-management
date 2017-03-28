'use strict';

import { connect } from 'react-redux';
import React, { Component } from 'react';
import Header from './Header.jsx';


export default class LoginPage extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="row">
        <Header />
        <div className="col s2 l4 " />
        <form className="col s8 l4 loginForm">
          <div className="row">
            <div className="input-field col s12">
              <input
                className="validate"
                type="email"
                name="email"
                id="email"
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
              />
              <label htmlFor="password">Enter your password</label>
            </div>

            <div>
              <span className="changeLogin">New User? <a href="#">Register Here</a></span>
            </div>
          </div>

          <br />
          <center>
            <div className="row">
              <button
                type="submit"
                name="btn_login"
                id="btn_login"
                onClick={this.onSave}
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
