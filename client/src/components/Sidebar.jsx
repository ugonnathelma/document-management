'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <ul id="slide-out" className="side-nav">
          <li>
            <Link to="/dashboard" className="col s12 menu_link"><div className="col s2">
              <center className="circle useractions">
                <i className="material-icons">view_list</i></center>
            </div>
              <p className="col s10 action_desc">All Documents</p>
            </Link>
          </li>
          <li>
            <Link to="/create-document" className="col s12 menu_link">
              <div className="col s2">
                <center className="circle useractions">
                  <i className="material-icons">note_add</i></center>
              </div>
              <p className="col s10 action_desc">Create A Document</p>
              </Link>
          </li>
        </ul>

      </div >
    );
  }
}

