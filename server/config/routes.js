const Users = require('../controllers/users');
const Documents = require('../controllers/documents');
const Roles = require('../controllers/roles');
const Authorization = require('../controllers/authorization');
const router = require('express').Router();

router.post('/api/v1/users/login', Users.login);
router.post('/api/v1/users', Users.createUser);
router.get('/api/v1/users', Authorization.isAuthorized, Authorization.isAdmin,
Users.getUsers);
router.get('/api/v1/users/:id', Authorization.isAuthorized, Users.findUser);
router.put('/api/v1/users/:id', Authorization.isAuthorized, Users.updateUserInfo);
router.delete('/api/v1/users/:id', Authorization.isAuthorized, Authorization.isAdmin, Users.deleteUser);
router.get('/api/v1/search/users/', Authorization.isAuthorized, Authorization.isAdmin, Users.searchUsers);

router.post('/api/v1/documents', Authorization.isAuthorized, Documents.createDocument);
router.get('/api/v1/documents', Authorization.isAuthorized, Documents.getDocuments);
router.get('/api/v1/documents/:id', Authorization.isAuthorized, Documents.findDocument);
router.put('/api/v1/documents/:id', Authorization.isAuthorized, Documents.updateDocumentInfo);
router.delete('/api/v1/documents/:id', Authorization.isAuthorized, Documents.deleteDocument);
router.get('/api/v1/users/:id/documents', Authorization.isAuthorized, Documents.findUserDocuments);
router.get('/api/v1/search/documents/', Authorization.isAuthorized, Documents.searchDocuments);

router.post('/api/v1/roles', Authorization.isAuthorized, Authorization.isAdmin, Roles.createRole);
router.get('/api/v1/roles', Authorization.isAuthorized, Authorization.isAdmin, Roles.getRoles);
router.delete('/api/v1/roles/:id', Authorization.isAuthorized, Authorization.isAdmin, Roles.deleteRole);


module.exports = router;
