import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import React, { Component } from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import viewAllDocumentsAction from '../actions/viewAllDocuments.js';
import checkTokenAction from '../actions/checkToken.js';

class ViewAllDocuments extends Component {
  componentWillMount() {
    this.props.viewAllDocuments();
  }
  render() {
    if (!window.localStorage.token) {
      browserHistory.push('/login');
    }
    return (
      <div className="row dashboardContainer col s12">
        <Header />
        <Sidebar />
        <div className="col s12 workspace">
          <div className="row workspace-header"><h4>All Your Documents</h4></div>

        </div>
      </div>

    );
  }
}


// viewAllDocuments.PropTypes = {
//   document: React.PropTypes.object.isRequired,
//   loginThings: React.PropTypes.func.isRequired,
//   CheckToken: React.PropTypes.func
// };

// viewAllDocuments.contextTypes = {
//   router: React.PropTypes.object
// };

const mapStoreToProps = (state) => {
  return {
    documents: state.documents
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    viewAllDocuments: () => dispatch(viewAllDocumentsAction()),
    CheckToken: () => dispatch(checkTokenAction())
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(ViewAllDocuments);

