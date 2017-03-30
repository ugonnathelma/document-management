'use strict';

import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';

const logoName = require('../../img/logo.png');

class Header extends Component {
  constructor(props) {
    super(props);
    const token = (window.localStorage.getItem('token'));
    if (token) {
      this.state = { username: jwtDecode(token).user.username };
    }
  }

  logout() {
    window.localStorage.removeItem('token');
    browserHistory.push('/');
  }

  componentDidMount() {
    $(document).ready(function () {
      $('select').material_select();
      $("#collapse_btn").sideNav();
      $("#collapse_btn").sideNav('hide');
    });
  }

  render() {
    if (window.localStorage.getItem('token')) {
      return (
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper">
              <a href="./" className="brand-logo"><img src={logoName} alt="logo" /></a>
              <ul id="loggedinNav">
                <li> <a href="/profile">{this.state.username}</a></li>
                <li><a onClick={this.logout}>Sign Out</a></li>
              </ul>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><a href="./">Home</a></li>
                <li><a href="https://github.com/andela-uofoegbu">Contact Us</a></li>
              </ul>
            </div>
            <Link data-activates="slide-out" className="btn" id="collapse_btn">
              <i className="material-icons">view_headline</i></Link>
          </nav>
        </div>

      );
    }
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">
            <a href="./" className="brand-logo"><img src={logoName} alt="logo" /></a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a href="./">Home</a></li>
              <li><a href="about.html">About Us</a></li>
              <li><a href="https://github.com/andela-uofoegbu">Contact Us</a></li>
            </ul>
          </div>
        </nav >
      </div>
    );
  }
}

// Header.propTypes = {
//   user: React.PropTypes.object
// }

const mapStoreToProps = (state) => {
  return {
    user: state.user
  }
};

export default connect(mapStoreToProps)(Header);

