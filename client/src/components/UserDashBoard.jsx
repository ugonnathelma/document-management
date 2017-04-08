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
      limit: 2,
      searchTerms: '',
      token: window.localStorage.getItem('token')
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchDocument = this.searchDocument.bind(this);
    this.refreshDocuments = this.refreshDocuments.bind(this);
    this.changeLimit = this.changeLimit.bind(this);
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

  changeLimit(value) {
    this.setState({ limit: value });
    this.refreshDocuments();
  }

  refreshDocuments() {
    const offset = 0;
    this.props.paginateDocuments(this.state.token, offset, this.state.limit);
    this.setState({
      searchTerms: ''
    });
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
                value={this.state.searchTerms}
                placeholder="Search..."
                onChange={this.handleChange}
              /><button className="btn col s2" id="searchBtn" onClick={this.searchDocument}>
                <i className="material-icons">search</i></button></div></div>
          <div className="col m1" />
          <div className="col m4 pagination-links">
            <Link onClick={() => this.changeLimit(5)}>View 5 per page</Link>
            <Link onClick={() => this.changeLimit(10)}>View 10 per page</Link>
            <Link onClick={() => this.changeLimit(20)} >View 20 per page</Link></div>
          <div className="col m5" />
          <div className="col m2">
            <Link onClick={this.refreshDocuments}>
              <i className="material-icons  refresh-list-btn">
                settings_backup_restore</i></Link></div>
          <DocumentList
            deleteDocument={this.props.deleteDocument}
            userid={this.state.userid}
            documents={this.props.paginated || this.props.documents || []}
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
    pageCount: state.allDocumentsReducer.pageCount
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

