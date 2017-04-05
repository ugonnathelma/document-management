import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
// import { Pagination } from 'react-materialize';

const DocumentList = ({ roles, userid, deleteRole }) => {
  return (
      <table className="highlight doc_list z-depth-4 panel pagination">
        <thead>
          <tr>
            <th>Title</th>
            <th>Access</th>
            <th>Published on</th>
          </tr>
        </thead>

        <tbody>
          {roles.map(role =>
            <tr key={role.id}>
              <td> <Link to={`/view-role/${role.id}`}>{role.title}</Link></td>
              <td>{role.access}</td>
              <td>{moment(role.publish_date).format('L')}</td>
              {
                (userid === role.user_id ?
                  <td><Link to={`/edit-role/${role.id}`}>
                    <i className="small material-icons">mode_edit</i></Link></td>
                  : <td />
                )}
              {
                (userid === role.user_id ?
                  <td><Link onClick={() => deleteRole(role.id)}>
                    <i className="small material-icons">delete</i></Link></td>
                  : <td />
                )}
            </tr>
          )}
        </tbody>
      </table>
  );
};


DocumentList.propTypes = {
  roles: React.PropTypes.array.isRequired
};

export default DocumentList;
