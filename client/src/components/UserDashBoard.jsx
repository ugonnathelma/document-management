import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import { Pagination } from 'react-materialize';
import jwtDecode from 'jwt-decode';
import React, { Component } from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import DocumentList from '../components/DocumentList.jsx';
import deleteDocumentAction from '../actions/documentManagement/deleteDocument.js';
import paginateDocumentAction from '../actions/documentManagement/paginateDocument.js';
import searchDocumentAction from '../actions/documentManagement/searchDocument.js';

class ViewAllDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      searchTerms: '',
      token: window.localStorage.getItem('token')
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchDocument = this.searchDocument.bind(this);
    this.refreshDocuments = this.refreshDocuments.bind(this);
  }

  componentWillMount() {
    if (this.state.token) {
      this.setState({ userid: jwtDecode(this.state.token).user.id });
      const offset = 0;
      this.props.paginateDocuments(this.state.token, offset, this.state.limit);
    }
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  searchDocument() {
    this.props.searchDocument(this.state.token, this.state.searchTerms);
  }

  refreshDocuments() {
    const offset = 0;
    this.props.paginateDocuments(this.state.token, offset, this.state.limit);
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
          <div className="row workspace-header">
            <h4 className="col s8">All Documents</h4><div className="col s4">
              <input
                className="col s10"
                type="text"
                id="searchTerms"
                name="searchTerms"
                placeholder="Search..."
                onChange={this.handleChange}
              /><button className="btn col s2" onClick={this.searchDocument}>
                <i className="material-icons">search</i></button></div></div>
          <div className="col m10" /><div className="col m2">
            <Link onClick={this.refreshDocuments}>
              <i className="material-icons  refresh-list-btn">
                settings_backup_restore</i></Link></div>
          <DocumentList
            deleteDocument={this.props.deleteDocument}
            userid={this.state.userid}
            documents={this.props.paginated || []}
          />
          <center>
            <Pagination
              items={this.props.pageCount}
              onSelect={(page) => {
                const token = window.localStorage.getItem('token');
                const offset = (page - 1) * this.state.limit;
                this.props.paginateDocuments(token, offset, this.state.limit);
              }}
            />
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
    deleteDocument: documentid =>
    dispatch(deleteDocumentAction(documentid)),
    paginateDocuments: (usertoken, offset, limit) =>
    dispatch(paginateDocumentAction(usertoken, offset, limit)),
    searchDocument: (usertoken, documentName) =>
    dispatch(searchDocumentAction(usertoken, documentName))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(ViewAllDocuments);

