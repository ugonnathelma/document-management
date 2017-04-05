import { Document, Role, sequelize, User } from '../models/index';

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
    const queryParams = {
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
        if (role.title === 'admin') {
          Document.findAndCountAll(queryParams)
          .then((result) => {
            return res.status(200)
            .json(result.rows.length ? {
              documents: result.rows,
              pageCount: Math.ceil(result.count / queryParams.limit)
            } : { documents: [], pageCount: 0 });
          });
        } else {
          sequelize.query(`SELECT *, COUNT(*) OVER () FROM "Documents"
            WHERE access = 'public'
            OR (access = 'role' AND role_id = ${role.id})
            OR (access = 'private' AND user_id = ${req.decoded.id})
            ORDER BY publish_date ${orderDirection}
            LIMIT ${queryParams.limit} OFFSET ${queryParams.offset};`,
            { type: sequelize.QueryTypes.SELECT }
            )
            .then((results) => {
              return res.status(200).json(results.length ?
              { documents: results, pageCount: Math.ceil(results[0].count / queryParams.limit) } :
              { documents: [], pageCount: 0 });
            });
        }
      });
  },
  findDocument: (req, res) => {
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
            (document.access === 'role' && document.role_id ===
            req.decoded.role_id
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
          if (document.access === 'role') {
            User.findOne({ where: { id: document.user_id } }).then((user) => {
              document.role_id = user.role_id;
            });
          }
          document.save()
            .then(() => {
              res.status(200).json(req.body);
            })
            .catch((err) => {
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
    const title = req.query.query;
    const orderDirection = req.query.order || 'DESC';
    const queryParams = {
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
        if (role.title === 'admin') {
          Document.findAndCountAll(Object.assign({}, { where: { title: { $iLike: `%${title}%` } } }, queryParams))
          .then((result) => {
            return res.status(200)
            .json(result.rows.length ? {
              documents: result.rows,
              pageCount: Math.ceil(result.count / queryParams.limit)
            } : { documents: [], pageCount: 0 });
          });
        } else {
          sequelize.query(`SELECT *, COUNT(*) OVER () FROM "Documents"
            WHERE title ILIKE '%${title}%'
            AND (access = 'public'
            OR (access = 'role' AND role_id = ${role.id})
            OR (access = 'private' AND user_id = ${req.decoded.id}))
            ORDER BY publish_date ${orderDirection}
            LIMIT ${queryParams.limit} OFFSET ${queryParams.offset};`,
            { type: sequelize.QueryTypes.SELECT }
            )
            .then((results) => {
              return res.status(200).json(results.length ?
              { documents: results, pageCount: Math.ceil(results[0].count / queryParams.limit) } :
              { documents: [], pageCount: 0 });
            });
        }
      });
  },
};

module.exports = DocumentController;
