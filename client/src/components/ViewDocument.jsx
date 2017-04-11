import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import React, { Component, PropTypes } from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import viewDocumentAction from '../actions/documentManagement/viewDocument.js';

class ViewDocument extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!window.localStorage.getItem('token')) {
      browserHistory.push('/');
    }
    const token = window.localStorage.getItem('token');
    if (token) {
      this.setState({ userid: jwtDecode(token).user.id });
      this.props.viewDocument(token, this.props.params.id);
    }
  }

  render() {
    return (
      <div className="row dashboardContainer col s12">
        <Header />
        <Sidebar />
        {(this.props.document) ?
          <div className="col s12 workspace ">
            <div className="row workspace-header"><h4>{ this.props.document.title || ''}</h4></div>
            <div className="doc_list z-depth-4 panel doc_content">
              <div>{ this.props.document.content || '' }</div>
            </div>
          </div>
          :
          <div>
            Document not Found
          </div>
        }
      </div>

    );
  }
}


ViewDocument.propTypes = {
  viewDocument: PropTypes.func
};

const mapStoreToProps = (state, ownProps) => {
  return {
    document: state.viewDocumentReducer.document
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    viewDocument: (usertoken, documentid) => dispatch(viewDocumentAction(usertoken, documentid))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(ViewDocument);

