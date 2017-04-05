'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router';
import jwtDecode from 'jwt-decode';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('token'),
    };
  }

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
          { jwtDecode(this.state.token).user.role_id === 1 ?
          (
            <div>
              <li>
                <Link to="/users" className="col s12 menu_link">
                  <div className="col s2">
                    <center className="circle useractions">
                      <i className="material-icons">note_add</i></center>
                  </div>
                  <p className="col s10 action_desc">All Users</p>
                </Link>
              </li>
              <li>
                <Link to="/create-role" className="col s12 menu_link">
                  <div className="col s2">
                    <center className="circle useractions">
                      <i className="material-icons">note_add</i></center>
                  </div>
                  <p className="col s10 action_desc">Create A Role</p>
                </Link>
              </li>
              <li>
                <Link to="/roles" className="col s12 menu_link">
                  <div className="col s2">
                    <center className="circle useractions">
                      <i className="material-icons">note_add</i></center>
                  </div>
                  <p className="col s10 action_desc">All Roles</p>
                </Link>
              </li>
            </div>
          ) : <span />}
        </ul>

      </div >
    );
  }
}

