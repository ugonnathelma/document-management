import { Document, Role } from '../models/index';

const PAGE_LIMIT = 10;
const PAGE_OFFSET = 0;

const DocumentController = {

  createDocument: (req, res) => {
    Document.create({
      title: req.body.title,
      user_id: req.decoded.id,
      content: req.body.content,
      access: req.body.access || 'public'
    })
    .then((document, err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json(document);
      }
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
      if (role.title === 'admin' && req.query.roleid) {
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
          return (role.title === 'admin' || document.access === 'public' ||
          (document.access === 'role' && document.role_id === req.decoded.role_id));
        });
        return res.status(200).json(returnDocuments.length ? returnDocuments : null);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
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
        (document.access === 'role' && document.role_id === req.decoded.role_id)) {
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
          document.save()
            .then((err) => {
              if (err) {
                return res.status(500).json({ error: err.message });
              }
                //  "Document Information Updated"
              return res.status(200).json(req.body);
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
      .then((document, err) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.status(200).json(document);
        }
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
    if (req.query.q) {
      Document.findAll({
        where: {
          title: {
            $iLike: `%${req.query.q}%`
          }
        }
      })
      .then((documents) => {
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
