import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
// import { Pagination } from 'react-materialize';

const RoleList = ({ roles, deleteRole, token }) => {
  return (
    <table className="highlight doc_list z-depth-4 panel pagination">
      <thead>
        <tr>
          <th>Title</th>
          <th>Create on</th>
        </tr>
      </thead>

      <tbody>
        {roles.map(role =>
          <tr key={role.id}>
            <td>{role.title}</td>
            <td>{moment(role.created_on).format('L')}</td>
            {
                (role.title !== 'admin' && role.title !== 'regular' ?
                  <td><Link onClick={() => deleteRole(token, role.id)}>
                    <i className="small material-icons">delete</i></Link></td>
                  : <td />
                )}
          </tr>
          )}
      </tbody>
    </table>
  );
};


RoleList.propTypes = {
  roles: React.PropTypes.array.isRequired
};

export default RoleList;
