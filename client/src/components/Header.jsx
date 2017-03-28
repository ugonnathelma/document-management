'use strict';

import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router';


export default class Header extends Component {
  constructor() {
    super();
    const token = (window.localStorage.getItem('token'));
    if (token) {
      this.state = { username: jwtDecode(token).user.username };
    }
  }

  logout() {
    window.localStorage.removeItem('token');
    browserHistory.push('/login');
  }

  render() {
    if (window.localStorage.getItem('token')) {
      return (
        <nav>
          <div className="nav-wrapper">
            <a href="./" className="brand-logo">Hayat</a>
            <ul id="loggedinNav">
              <li> <a href="/profile">{this.state.username}</a></li>
              <li><a onClick={this.logout}>Sign Out</a></li>
            </ul>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a href="./">Home</a></li>
              <li><a href="about.html">About Us</a></li>
              <li><a href="https://github.com/andela-uofoegbu">Contact Us</a></li>
            </ul>
          </div>
        </nav>
      );
    }
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="./" className="brand-logo">Hayat</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="./">Home</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="https://github.com/andela-uofoegbu">Contact Us</a></li>
          </ul>
        </div>
      </nav >
    );
  }
}

