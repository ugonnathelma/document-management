'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _index = require('../models/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('dotenv').config();

var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: 'login',
    value: function login(req, res) {
      _index.User.findOne({ where: { email: req.body.email } }).then(function (user) {
        _bcrypt2.default.compare(req.body.password, user.password_digest, function (err, same) {
          var token = _jsonwebtoken2.default.sign({ user: user }, process.env.SECRET_KEY, { expiresIn: '1h' });
          res.status(200).json({ success: same, token: token });
        });
      }).catch(function (err) {
        res.status(404).json({ error: err.message });
      });
    }
  }, {
    key: 'createUser',
    value: function createUser(req, res) {
      _index.User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        password_confirmation: req.body.password_confirmation,
        role_id: req.body.role_id
      }).then(function (user, err) {
        if (err) {
          res.status(400).json({ error: err.message });
        } else {
          res.status(201).json({ user: user });
        }
      }).catch(function (err) {
        res.status(400).json({ error: err.message });
      });
    }
  }, {
    key: 'getUsers',
    value: function getUsers(req, res) {
      var queryParams = {
        limit: 10,
        offset: 0
      };
      if (req.query.limit && req.query.offset) {
        queryParams = {
          limit: req.query.limit,
          offset: req.query.offset
        };
      }
      _index.User.all(queryParams).then(function (users) {
        res.status(200).json(users);
      }).catch(function (err) {
        res.status(500).json({ error: err.message });
      });
    }
  }, {
    key: 'findUser',
    value: function findUser(req, res) {
      _index.User.findOne({ where: { id: req.params.id } }).then(function (user) {
        res.status(200).json(user);
      }).catch(function (err) {
        res.status(404).json({ error: err.message });
      });
    }
  }, {
    key: 'updateUserInfo',
    value: function updateUserInfo(req, res) {
      if (req.decoded) {
        _index.User.find({
          where: {
            id: req.decoded.id
          }
        }).then(function (user) {
          if (user) {
            user.name = req.body.name;
            user.password = req.body.password;
            user.password_confirmation = req.body.password_confirmation;
            user.save().then(function (err) {
              if (err) {
                return res.status(500).json({ error: err.message });
              }
              //  "User Information Updated"
              return res.status(200).json(req.body);
            }).catch(function (err) {
              res.status(500).json({ error: err.message });
            });
          }
        });
      }
    }
  }, {
    key: 'deleteUser',
    value: function deleteUser(req, res) {
      _index.User.destroy({
        where: {
          id: req.params.id
        }
      }).then(function (user, err) {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.status(200, 'User Deleted').json(user);
        }
      });
    }
  }, {
    key: 'searchUsers',
    value: function searchUsers(req, res) {
      if (req.query.q) {
        _index.User.findAll({
          where: {
            name: {
              $iLike: '%' + req.query.q + '%'
            }
          }
        }).then(function (users) {
          res.status(200).json(users);
        }).catch(function (err) {
          res.status(500).json({ error: err.message });
        });
      } else {
        res.status(500).json({ error: 'Search query not found' });
      }
    }
  }]);

  return UserController;
}();

module.exports = UserController;