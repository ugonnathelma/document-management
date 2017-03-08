const Users = require('../controllers/users');
const Documents = require('../controllers/documents');
const router = require('express').Router();
// console.log(Users);
router.get('/', (req, res) => {
  res.send('hello world');
});
router.post('/users/login', Users.login);
router.post('/users', Users.createUser);
router.get('/users', Users.getUsers);
router.get('/users/:id', Users.findUser);
router.put('/users/:id', Users.updateUserInfo);
router.delete('/users/:id', Users.deleteUser);
router.get('/search/users/', Users.searchUsers);

router.post('/documents', Documents.createDocument);
router.get('/documents', Documents.getDocuments);
router.get('/documents/:id', Documents.findDocument);
router.put('/documents/:id', Documents.updateDocumentInfo);
router.delete('/documents/:id', Documents.deleteDocument);
router.get('/users/:id/documents', Documents.findUserDocuments);
router.get('/search/documents/', Documents.searchDocuments);


module.exports = router;
