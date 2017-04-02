import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Pagination } from 'react-materialize';
import jwtDecode from 'jwt-decode';
import React, { Component } from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import DocumentList from '../components/DocumentList.jsx';
import viewAllDocumentsAction from '../actions/viewAllDocuments.js';
import deleteDocumentAction from '../actions/deleteDocument.js';
import paginateDocumentAction from '../actions/paginateDocument.js';

class ViewAllDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 2
    };
  }

  componentWillMount() {
    const token = window.localStorage.getItem('token');
    if (token) {
      this.setState({ userid: jwtDecode(token).user.id });
      const offset = 0;
      this.props.paginateDocuments(token, offset, this.state.limit);
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
          <DocumentList deleteDocument={this.props.deleteDocument} userid={this.state.userid} documents={this.props.paginated || this.props.documents} />
          <center>
            <Pagination
              items={this.props.pageCount}
              onSelect={(page) => {
              const token = window.localStorage.getItem('token');
              const offset = (page - 1) * this.state.limit;
              console.log(offset, this.state.limit, 'page it');
              this.props.paginateDocuments(token, offset, this.state.limit);
            }} />
          </center>
        </div>
      </div>
    );
  }
}


ViewAllDocuments.PropTypes = {
  documents: React.PropTypes.array.isRequired,
  paginateDocuments: React.PropTypes.func.isRequired
};

const mapStoreToProps = (state) => {
  return {
    documents: state.allDocumentsReducer.documents,
    pageCount: state.allDocumentsReducer.pageCount,
    paginated: state.allDocumentsReducer.paginated
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteDocument: (usertoken, documentid) => dispatch(deleteDocumentAction(usertoken, documentid)),
    viewDocuments: usertoken => dispatch(viewAllDocumentsAction(usertoken)),
    paginateDocuments: (usertoken, offset, limit) => dispatch(paginateDocumentAction(usertoken, offset, limit))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(ViewAllDocuments);

