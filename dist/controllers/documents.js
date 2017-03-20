'use strict';

var _index = require('../models/index');

var PAGE_LIMIT = 10;
var PAGE_OFFSET = 0;

var DocumentController = {

  createDocument: function createDocument(req, res) {
    _index.Document.create({
      title: req.body.title,
      user_id: req.decoded.id,
      content: req.body.content,
      access: req.body.access || 'public'
    }).then(function (document, err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json(document);
      }
    }).catch(function (err) {
      res.status(500).json({ error: err.message });
    });
  },
  getDocuments: function getDocuments(req, res) {
    var orderDirection = req.query.order || 'DESC';
    var queryParams = {
      limit: req.query.limit || PAGE_LIMIT,
      offset: req.query.offset || PAGE_OFFSET,
      order: [['publish_date', orderDirection]]
    };
    _index.Role.find({
      where: {
        id: req.decoded.role_id
      }
    }).then(function (role) {
      if (role.title === 'admin' && req.query.roleid) {
        queryParams = Object.assign({}, queryParams, {
          where: {
            role_id: req.query.role_id
          }
        });
      }
      _index.Document.all(queryParams).then(function (documents) {
        // eslint-disable-next-line arrow-body-style
        var returnDocuments = documents.filter(function (document) {
          return role.title === 'admin' || document.access === 'public' || document.access === 'role' && document.role_id === req.decoded.role_id;
        });
        return res.status(200).json(returnDocuments.length ? returnDocuments : null);
      }).catch(function (err) {
        res.status(500).json({ error: err.message });
      });
    });
  },
  findDocument: function findDocument(req, res) {
    var queryParams = {};
    _index.Role.find({
      where: {
        id: req.decoded.role_id
      }
    }).then(function (role) {
      queryParams = {
        where: {
          id: req.params.id
        }
      };
      _index.Document.findOne(queryParams).then(function (document) {
        if (role.title === 'admin' || document.access === 'public' || document.access === 'role' && document.role_id === req.decoded.role_id) {
          return res.status(200).json(document);
        }
        return res.status(200).json(null);
      }).catch(function (err) {
        res.status(400).json({ error: err.message });
      });
    });
  },
  updateDocumentInfo: function updateDocumentInfo(req, res) {
    _index.Document.find({
      where: {
        id: req.params.id
      }
    }).then(function (document) {
      if (document) {
        document.title = req.body.title;
        document.content = req.body.content;
        document.save().then(function (err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          //  "Document Information Updated"
          return res.status(200).json(req.body);
        }).catch(function (err) {
          res.status(500).json({ error: err.message });
        });
      }
    });
  },
  deleteDocument: function deleteDocument(req, res) {
    if (req.decoded) {
      _index.Document.destroy({
        where: {
          id: req.params.id
        }
      }).then(function (document, err) {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.status(200).json(document);
        }
      });
    }
  },
  findUserDocuments: function findUserDocuments(req, res) {
    _index.Document.all({
      where: { user_id: req.params.id }
    }).then(function (documents) {
      res.status(200).json(documents);
    }).catch(function (err) {
      res.status(500).json({ error: err.message });
    });
  },
  searchDocuments: function searchDocuments(req, res) {
    if (req.query.q) {
      _index.Document.findAll({
        where: {
          title: {
            $iLike: '%' + req.query.q + '%'
          }
        }
      }).then(function (documents) {
        res.status(200).json(documents);
      }).catch(function (err) {
        res.status(500).json({ error: err.message });
      });
    } else {
      res.status(500).json({ error: 'Search query not found' });
    }
  }
};

module.exports = DocumentController;