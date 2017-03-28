'use strict';

import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">Hayat</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="home.html">Home</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="https://github.com/andela-uofoegbu">Contact Us</a></li>
          </ul>
        </div>
      </nav >
    );
  }
}

