import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import React, { Component, PropTypes } from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import createRoleAction from '../actions/roleManagement/newRole.js';
import checkTokenAction from '../actions/authorizationManagement/checkToken.js';

class CreateRole extends Component {
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
    if (!window.localStorage.getItem('token')) {
      browserHistory.push('/');
    }
  }

  componentDidMount() {
    $(this.refs.access).material_select(this.handleChange.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.status === 'success') {
      browserHistory.push('/roles');
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.CreateRole(this.state);
  }

  render() {
    return (
      <div className="row dashboardContainer col s12">
        <Header />
        <Sidebar />
        <div className="col s12 workspace">
          <div className="row workspace-header"><h4>Create A Role</h4></div>
          <form onSubmit={this.handleSubmit} className="panel">
            <div className="field row">
              <div className="col m9 s12 document-name-field">
                <input
                  type="text" name="title"
                  id="title"
                  onChange={this.handleChange}
                  placeholder="Name of Role"
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


CreateRole.PropTypes = {
  role: PropTypes.object.isRequired,
  CheckToken: PropTypes.func
};

CreateRole.contextTypes = {
  router: PropTypes.object
};

const mapDispatchToProps = (dispatch) => {
  return {
    CreateRole: roleDetails => dispatch(createRoleAction(roleDetails)),
    CheckToken: () => dispatch(checkTokenAction())
  };
};

export default connect(null, mapDispatchToProps)(CreateRole);

