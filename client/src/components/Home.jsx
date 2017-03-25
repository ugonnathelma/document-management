'use strict';

import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    return (
      <div className="row">
        <div className="col s4" />
        <form className="col s4" method="post" id="loginForm">
          <div className="row">
            <div className="input-field col s12">
              <input className="validate" type="email" name="email" id="email" />
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
            <a className="pink-text" href="#!"><b>Forgot Password?</b></a>
          </div>

          <br />
          <center>
            <div className="row">
              <button
                type="submit"
                name="btn_login"
                className="col s12 btn btn-large waves-effect amber accent-2"
              >
                Login
                </button>
            </div>
          </center>
        </form>
        <div className="col s4" />
      </div>
    );
  }
}

