import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';


const DocumentList = ({ documents, userid, deleteDocument }) => {
  return (
    <table className="highlight doc_list z-depth-4 panel">
      <thead>
        <tr>
          <th>Title</th>
          <th>Access</th>
          <th>Published on</th>
        </tr>
      </thead>

      <tbody>
        {documents.map(document =>
          <tr key={document.id}>
            <td> <Link to={`/view-document/${document.id}`} >{document.title}</Link></td>
            <td>{document.access}</td>
            <td>{moment(document.publish_date).format('L')}</td>
            {
               (userid === document.user_id ?
                 <td><Link to={`/edit-document/${document.id}`}>
                   <i className="small material-icons">mode_edit</i></Link></td>
                : <td />
            )}
            {
               (userid === document.user_id ?
                 <td><Link onClick={() => deleteDocument(document.id)}>
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
  documents: React.PropTypes.array.isRequired
};

export default DocumentList;
