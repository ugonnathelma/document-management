import moment from 'moment';
import { Document, Role } from '../models/index';

const PAGE_LIMIT = 10;
const PAGE_OFFSET = 0;

const DocumentController = {

  createDocument: (req, res) => {
    let roleId;
    if (req.body.access !== 'role') {
      roleId = null;
    } else {
      roleId = req.decoded.role_id;
    }
    Document.create({
      title: req.body.title,
      user_id: req.decoded.id,
      content: req.body.content,
      access: req.body.access || 'public',
      role_id: roleId
    })
      .then((document) => {
        res.status(201).json(document);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  },
  getDocuments: (req, res) => {
    const orderDirection = req.query.order || 'DESC';
    let queryParams = {
      limit: req.query.limit || PAGE_LIMIT,
      offset: req.query.offset || PAGE_OFFSET,
      order: [['publish_date', orderDirection]]
    };
    Role.find({
      where: {
        id: req.decoded.role_id
      }
    })
      .then((role) => {
        if (role.title === 'admin' && req.query.role_id) {
          queryParams = Object.assign({}, queryParams, {
            where: {
              role_id: req.query.role_id
            }
          });
        }
        Document.all(queryParams)
          .then((documents) => {
            // eslint-disable-next-line arrow-body-style
            const returnDocuments = documents.filter((document) => {
              return (role.title === 'admin' ||
                document.access === 'public' ||
                (document.access === 'role'
                  && document.role_id === req.decoded.role_id)
                || (document.access === 'private'
                  && document.user_id === req.decoded.id));
            });
            return res.status(200).json(returnDocuments.length ? returnDocuments : []);
          })
          .catch((err) => {
            res.status(500).json({ error: err.message });
          });
      });
  },
  findDocument: (req, res) => {
    console.log(req.params.id, 'param id');
    let queryParams = {};
    Role.find({
      where: {
        id: req.decoded.role_id
      }
    })
      .then((role) => {
        queryParams = {
          where: {
            id: req.params.id
          }
        };
        Document.findOne(queryParams).then((document) => {
          if (role.title === 'admin' || document.access === 'public' ||
            (document.access === 'role' && document.role_id === req.decoded.role_id
            ) || (document.access === 'private'
              && document.user_id === req.decoded.id)
          ) {
            return res.status(200).json(document);
          }
          return res.status(200).json(null);
        }).catch((err) => {
          res.status(400).json({ error: err.message });
        });
      });
  },
  updateDocumentInfo: (req, res) => {
    Document.find({
      where: {
        id: req.params.id
      }
    })
      .then((document) => {
        if (document) {
          document.title = req.body.title;
          document.content = req.body.content;
          document.access = req.body.access;
          document.save()
            .then(() => {
              res.status(200).json(req.body);
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({ error: err.message });
            });
        }
      });
  },
  deleteDocument: (req, res) => {
    if (req.decoded) {
      Document.destroy({
        where: {
          id: req.params.id
        }
      })
        .then((document) => {
          res.status(200).json(document);
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    }
  },
  findUserDocuments: (req, res) => {
    Document.all({
      where: { user_id: req.params.id }
    }).then((documents) => {
      res.status(200).json(documents);
    })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  },
  searchDocuments: (req, res) => {
    if (req.query.query) {
      Document.findAll({
        where: {
          title: {
            $iLike: `%${req.query.query}%`
          }
        }
      })
        .then((documents) => {
          documents = req.query.publish_date ? documents.filter((document) => {
            return moment(document.publish_date).diff(req.query.publish_date, 'days') === 0;
          }) : documents;
          res.status(200).json(documents);
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    } else {
      res.status(500).json({ error: 'Search query not found' });
    }
  }
};

module.exports = DocumentController;
