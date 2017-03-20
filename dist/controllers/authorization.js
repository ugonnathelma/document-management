'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _index = require('../models/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var AuthorizationController = {
  // eslint-disable-next-line arrow-body-style
  getToken: function getToken(req) {
    return req.headers.authorization ? req.headers.authorization.split(' ')[1] : '';
  },

  isAuthorized: function isAuthorized(req, res, next) {
    if (_jsonwebtoken2.default.verify(AuthorizationController.getToken(req, res), process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        return res.status(401).json({ err: 'Token expired' });
      }
      req.decoded = decoded;
      next();
    })) ;
  },

  isAdmin: function isAdmin(req, res, next) {
    _index.User.findOne({
      where: {
        id: req.decoded.id
      }
    }).then(function (user) {
      user.getRole().then(function (role) {
        if (role.title === 'admin') {
          next();
        } else {
          res.status(403).json({ error: 'Only an admin can perform this action' });
        }
      }).catch(function (error) {
        res.status(401).json({ error: error.message });
      });
    });
  },

  isOwner: function isOwner(req, res, next) {
    var decodedToken = _jsonwebtoken2.default.decode(AuthorizationController.getToken(req, res));
    _index.Document.find({
      where: {
        id: req.params.id
      }
    }).then(function (document) {
      if (document.user_id === decodedToken.user.id) {
        req.decoded = decodedToken;
        next();
      } else {
        res.status(403).json({ error: 'Unauthorized to view this document' });
      }
    });
  }
};

module.exports = AuthorizationController;