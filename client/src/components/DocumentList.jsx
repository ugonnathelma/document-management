import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

const confirmDeletion = (callback, documentId) => {
  swal({
    title: 'Are you sure?',
    text: 'Would you like to delete this document?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes, delete it!',
    closeOnConfirm: false,
    closeOnCancel: false
  },
  (deletionConfirmed) => {
    if (deletionConfirmed) {
      callback(documentId);
      swal('Deleted!', 'Your document has been deleted.', 'success');
    } else {
      swal('Cancelled!', 'Your document  was not deleted.', 'error');
    }
  });
};

const DocumentList = ({ documents, userid, deleteDocument }) => {
  return (
      <table id="document-list" className="highlight doc_list z-depth-4 panel pagination">
        <thead>
          <tr>
            <th>Title</th>
            <th>Creator</th>
            <th>Access</th>
            <th>Published on</th>
          </tr>
        </thead>

        <tbody>
          {documents.map(document =>
            <tr key={document.id}>
              <td className="doc-title"> <Link to={`/view-document/${document.id}`}>{document.title}</Link></td>
              <td className="doc-title"> <Link to={`/profile/${document.user_id}`}>{document.first_name || document.User.first_name } {document.last_name || document.User.last_name }</Link></td>
              <td>{document.access}</td>
              <td>{moment(document.publish_date).format('L')}</td>
              {
                (userid === document.user_id ?
                  <td><Link to={`/edit-document/${document.id}`}>
                    <i className="small material-icons edit-btn">mode_edit</i></Link></td>
                  : <td />
                )}
              {
                (userid === document.user_id ?
                  <td><Link onClick={() => confirmDeletion(deleteDocument, document.id)}>
                    <i className="small material-icons delete-btn">delete</i></Link></td>
                  : <td />
                )}
            </tr>
          )}
        </tbody>
      </table>
  );
};


DocumentList.propTypes = {
  documents: React.PropTypes.array.isRequired,
  userid: React.PropTypes.number,
  deleteDocument: React.PropTypes.func
};

export default DocumentList;
