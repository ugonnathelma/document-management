import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import React, { Component, PropTypes } from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import editRoleAction from '../actions/roleManagement/editRole.js';
import checkTokenAction from '../actions/authorizationManagement/checkToken.js';
import viewRole from '../actions/roleManagement/findRole.js';

class EditRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.props.CheckToken();
  }

  componentWillMount() {
    const token = window.localStorage.getItem('token');
    if (token) {
      this.props.viewRole(token, this.props.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.role.title,
    });
    if (nextProps.status === 'success') {
      browserHistory.push('/roles');
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.EditRole(this.state, localStorage.getItem('token'), this.props.params.id);
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
          <div className="row workspace-header"><h4>Edit Role</h4></div>
          <form onSubmit={this.handleSubmit} className="panel">
            <div className="field row">
              <div className="col m9 s12 document-name-field">
                <input
                  type="text" name="title"
                  id="title"
                  onChange={this.handleChange}
                  value={this.state.title}
                />
              </div>
            </div>
            <div className="field row">
              <button className="btn" type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


EditRole.PropTypes = {
  role: PropTypes.object.isRequired,
  CheckToken: PropTypes.func
};

EditRole.contextTypes = {
  router: PropTypes.object
};

const mapStoreToProps = (state, ownProps) => {
  return {
    role: state.allRolesReducer.role,
    status: state.allRolesReducer.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    EditRole: (roleDetails, token, roleid) => dispatch(editRoleAction(roleDetails, token, roleid)),
    CheckToken: () => dispatch(checkTokenAction()),
    viewRole: (token, roleid) => dispatch(viewRole(token, roleid))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(EditRole);

