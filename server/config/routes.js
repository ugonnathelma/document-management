const Users = require('../controllers/users');
const Documents = require('../controllers/documents');
const Roles = require('../controllers/roles');
const Authorization = require('../controllers/authorization');
const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('hello world');
});
router.post('/users/login', Users.login);
router.post('/users', Users.createUser);
router.get('/users', Authorization.isAuthorized, Authorization.isAdmin,
Users.getUsers);
router.get('/users/:id', Authorization.isAuthorized, Users.findUser);
router.put('/users/:id', Authorization.isAuthorized, Users.updateUserInfo);
router.delete('/users/:id', Authorization.isAuthorized, Authorization.isAdmin, Users.deleteUser);
router.get('/search/users/', Authorization.isAuthorized, Authorization.isAdmin, Users.searchUsers);

router.post('/documents', Authorization.isAuthorized, Documents.createDocument);
router.get('/documents', Authorization.isAuthorized, Documents.getDocuments);
router.get('/documents/:id', Authorization.isAuthorized, Documents.findDocument);
router.put('/documents/:id', Authorization.isAuthorized, Documents.updateDocumentInfo);
router.delete('/documents/:id', Authorization.isAuthorized, Documents.deleteDocument);
router.get('/users/:id/documents', Authorization.isAuthorized, Documents.findUserDocuments);
router.get('/search/documents/', Authorization.isAuthorized, Documents.searchDocuments);

router.post('/roles', Authorization.isAuthorized, Authorization.isAdmin, Roles.createRole);
router.get('/roles', Authorization.isAuthorized, Authorization.isAdmin, Roles.getRoles);
router.delete('/roles/:id', Authorization.isAuthorized, Authorization.isAdmin, Roles.deleteRole);


module.exports = router;
