'use strict';

var _index = require('../models/index');

var RoleController = {

  createRole: function createRole(req, res) {
    _index.Role.create({
      title: req.body.title
    }).then(function (role, err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json(role);
      }
    }).catch(function (err) {
      res.status(500).json({ error: err.message });
    });
  },

  deleteRole: function deleteRole(req, res) {
    _index.Role.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (role, err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200, 'Role Deleted').json(role);
      }
    }).catch(function (err) {
      res.status(500).json({ error: err.message });
    });
  },

  getRoles: function getRoles(req, res) {
    _index.Role.all().then(function (roles) {
      res.status(200).json(roles);
    }).catch(function (err) {
      res.status(500).json({ error: err.message });
    });
  }
};

module.exports = RoleController;