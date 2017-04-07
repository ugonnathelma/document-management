import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router';
import React, { Component, PropTypes } from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import viewDocument from '../actions/documentManagement/viewDocument.js';
import checkTokenAction from '../actions/authorizationManagement/checkToken.js';
import editDocument from '../actions/documentManagement/editDocument.js';



const ResponseMessage = (props) => {
  if (props.status === 'success') {
    return (
      <div>
        Document Updated
      </div>
    );
  } else if (props.status === 'failed') {
    return (
      <div>
        Document not Updated
      </div>
    );
  } else {
    return (<span />);
  }
};


class EditDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      access: '',
      status: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.props.CheckToken();
  }

  componentWillMount() {
    const token = window.localStorage.getItem('token');
    if (token) {
      this.props.viewDocument(token, this.props.params.id);
    }
  }

  componentDidMount() {
    $(this.refs.access).material_select(this.handleChange.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.document.title,
      access: nextProps.document.access,
      content: nextProps.document.content
    });
    $('#access').val(nextProps.document.access);

    if (nextProps.status === 'success') {
      browserHistory.push('/dashboard');
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    const token = localStorage.getItem('token');
    event.preventDefault();
    this.props.editDocument(this.state, token, this.props.params.id);
  }

  render() {
    if (!window.localStorage.getItem('token')) {
      browserHistory.push('/');
    }
    return (
      <div className="row dashboardContainer col s12">
        <Header />
        <Sidebar />
        <div className="col s12 workspace">
          <div className="row workspace-header"><h4></h4></div>
          <form onSubmit={this.handleSubmit} className="panel">
            <div className="field row">
              <div className="col m9 s12 document-name-field">
                <input
                  type="text" name="title"
                  id="title"
                  onChange={this.handleChange}
                  placeholder="Name of Document"
                  value={this.state.title}
                />
              </div>
              <div className="col m3 s12">
                <select
                  name="access"
                  id="access"
                  onChange={this.handleChange}
                  value={this.state.value}
                  className="browser-default"
                >
                  <option value="" disabled >Select Access Type</option>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="role">Role</option>
                </select>
              </div>
            </div>
            <div className="field row">
              <textarea
                name="content"
                id="content"
                onChange={this.handleChange}
                placeholder="Type your content here..."
                value={this.state.content}
              />
            </div>
            <div className="field row">
              <button className="btn" type="submit">Save</button>
            </div>
            <ResponseMessage status={this.props.status} />
          </form>
        </div>
      </div>

    );
  }
}


EditDocument.PropTypes = {
  document: PropTypes.object.isRequired,
  CheckToken: PropTypes.func
};

EditDocument.contextTypes = {
  router: PropTypes.object
};

const mapStoreToProps = (state, ownProps) => {
  return {
    document: state.allDocumentsReducer.document,
    status: state.allDocumentsReducer.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    viewDocument: (token, documentid) => dispatch(viewDocument(token, documentid)),
    editDocument: (documentDetails, token, documentid) =>
    dispatch(editDocument(documentDetails, token, documentid)),
    CheckToken: () => dispatch(checkTokenAction())
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(EditDocument);

