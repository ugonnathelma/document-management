const Document = require("../models/index.js").Document;
class DocumentController {

  static createDocument(req, res) {
    let document = Document.build({
      title: req.body.title,
      user_id: req.body.user_id,
      content: req.body.content,
      access: req.body.access
    })
    document.save()
      .then((user, err) => {
        if (err) {
          res.status(500).json({ error: err.message });
        }
        else {
          res.status(200, "Document Created").json(document);
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      })
  }

  static getDocuments(req, res) {
    let queryParams = {
      limit: 10,
      offset: 0
    };
    if (req.query.limit && req.query.offset) {
      queryParams = {
        limit: req.query.limit,
        offset: req.query.offset
      };
    }
    Document.all(queryParams)
      .then((documents) => {
        res.status(200).json(documents);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      })
  }

  static findDocument(req, res) {
    Document.findOne({ where: { id: req.params.id } }).then((document) => {
      res.status(200).json(document);
    }).catch((err) => {
      res.status(404).json({ error: err.message });
    })
  }

  static updateDocumentInfo(req, res) {
    Document.find({
      where: {
        id: req.params.id
      }
    })
      .then((document, err) => {
        if (document) {
          document.title= req.body.title;
          document.content = req.body.content;
          document.save()
            .then((document, err) => {
              if (err) {
                return res.status(500).json({ error: err.message });
              } else {
                //  "Document Information Updated"
                return res.status(200).json(req.body);
              }
            })
            .catch((err) => {
              res.status(500).json({ error: err.message });
            })
        }
      })
  }

  static deleteDocument(req, res) {
    Document.destroy({
      where: {
        id: req.params.id
      }
    })
      .then((document, err) => {
        if (err) {
          res.status(500).json({ error: err.message })
        } else {
          res.status(200, "Document Deleted").json(document);
        }
      })
  }


  static findUserDocuments(req, res) {
    Document.all({
      where: { user_id: req.params.id }
    }).then((documents) => {
      res.status(200).json(documents);
    })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      })
  }

  static searchDocuments(req, res) {
    if(req.query.q)
    {
      Document.findAll({
        where: {
          title : {
            $iLike : `%${req.query.q}%`
          }
        }
      })
      .then((documents) => {
        res.status(200).json(documents);
      })
      .catch((err) => {
        res.status(500).json({error: err.message});
      })
    }
    else{
      res.status(500).json({error: "Search query not found"})
    }
  }
}

module.exports = DocumentController;