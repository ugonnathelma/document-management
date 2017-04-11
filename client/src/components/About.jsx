import { connect } from 'react-redux';
import { Link } from 'react-router';
import React, { Component } from 'react';
import Header from './Header.jsx';


class AboutPage extends Component {
  render() {
    return (
      <div className="row">
        <Header />
        <div className="col s2 l4 " />
        <p className="about-us">doThis is an application that helps users manage their documents in an organized way. A User can be able to upload a document, edit it and share it with other users.</p>
        <div className="col s2 l4" />
      </div>

    );
  }
}
export default connect(null, null)(AboutPage);
