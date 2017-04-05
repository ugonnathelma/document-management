import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
// import { Pagination } from 'react-materialize';

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
                    onChange={event => updateUserRole(event.target.value, user.id)}
                  >
                    {roles.map(role =>
                      <option key={role.id} value={role.id} selected={user.role_id === role.id}>{role.title}</option>
                    )}
                  </select>
                : <span />
                }
              </td>
              <td>{moment(user.publish_date).format('L')}</td>

              { user.role_id !== 1 ?
                <td><Link onClick={() => deleteUser(user.id)}>
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
