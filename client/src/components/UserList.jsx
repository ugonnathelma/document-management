import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
// import { Pagination } from 'react-materialize';

const UserList = ({ users, userid, deleteUser }) => {
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
              <td> <Link>{user.first_name}</Link></td>
              <td> <Link>{user.last_name}</Link></td>
              <td> <Link>{user.username}</Link></td>
              <td> <Link>{user.email}</Link></td>
              <td>{moment(user.publish_date).format('L')}</td>
              <td><Link onClick={() => deleteUser(user.id)}>
                <i className="small material-icons">delete</i></Link></td>
            </tr>
          )}
        </tbody>
      </table>
  );
};


UserList.propTypes = {
  users: React.PropTypes.array.isRequired
};

export default UserList;
