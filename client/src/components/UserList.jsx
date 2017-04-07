import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
// import { Pagination } from 'react-materialize';

const confirmDeletion = (callback, userId) => {
  swal({
    title: 'Are you sure?',
    text: 'Would you like to delete this user?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes, delete it!',
    closeOnConfirm: false,
    closeOnCancel: false
  },
  (deletionConfirmed) => {
    if (deletionConfirmed) {
      callback(userId);
      swal('Deleted!', 'The user has been deleted.', 'success');
    } else {
      swal('Cancelled!', 'The user was not deleted.', 'error');
    }
  });
};

const confirmUpdateRole = (callback, roleId, userId) => {
  swal({
    title: 'Are you sure?',
    text: 'Would you like to change this user\'s role?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes, update it!',
    closeOnConfirm: false,
    closeOnCancel: false
  },
  (deletionConfirmed) => {
    if (deletionConfirmed) {
      callback(roleId, userId);
      swal('Updated!', 'The user\'s role has been updated.', 'success');
    } else {
      swal('Cancelled!', 'The user\'s role was not changed.', 'error');
    }
  });
};

const UserList = ({ users, userid, deleteUser, saveUserRole, roles, updateUserRole }) => {
  return (
      <table className="highlight doc_list z-depth-4 panel pagination">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Registered on</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                { user.role_id !== 1 ?
                  <select
                    className="userRoleSelect browser-default"
                    onChange={event => confirmUpdateRole(updateUserRole, event.target.value, user.id)}
                    value={user.role_id}
                  >
                    {roles.map(role =>
                      <option key={role.id} value={role.id}>{role.title}</option>
                    )}
                  </select>
                : <span />
                }
              </td>
              <td>{moment(user.publish_date).format('L')}</td>

              { user.role_id !== 1 ?
                <td><Link onClick={() => confirmDeletion(deleteUser, user.id)}>
                  <i className="small material-icons">delete</i></Link></td>
                : <td />
              }
            </tr>
          )}
        </tbody>
      </table>
  );
};


UserList.propTypes = {
  users: React.PropTypes.array.isRequired,
  roles: React.PropTypes.array.isRequired
};

export default UserList;
