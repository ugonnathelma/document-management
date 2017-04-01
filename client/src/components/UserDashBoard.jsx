import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import React, { Component } from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import DocumentList from '../components/DocumentList.jsx';
import viewAllDocumentsAction from '../actions/viewAllDocuments.js';
import deleteDocumentAction from '../actions/deleteDocument.js';

class ViewAllDocuments extends Component {

  componentWillMount() {
    const token = window.localStorage.getItem('token');
    console.log(jwtDecode(token));
    if (token) {
      this.setState({ userid: jwtDecode(token).user.id });
      this.props.viewDocuments(token);
    }
  }

  render() {
    if (!window.localStorage.getItem('token')) {
      browserHistory.push('/');
    }
    return (
      <div className="row dashboardContainer col s12">
        <Header />
        <Sidebar />
        <div className="col s12 workspace ">
          <div className="row workspace-header"><h4>All Your Documents</h4></div>
          <DocumentList deleteDocument={this.props.deleteDocument} userid={this.state.userid} documents={this.props.documents || []} />
        </div>
      </div>

    );
  }
}


ViewAllDocuments.PropTypes = {
  documents: React.PropTypes.array.isRequired
};

const mapStoreToProps = (state, ownProps) => {
  return {
    documents: state.allDocumentsReducer.documents
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteDocument: (usertoken, documentid) => dispatch(deleteDocumentAction(usertoken, documentid)),
    viewDocuments: usertoken => dispatch(viewAllDocumentsAction(usertoken))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(ViewAllDocuments);

