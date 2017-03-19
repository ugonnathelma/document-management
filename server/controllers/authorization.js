import jwt from 'jsonwebtoken';
import { User, Document } from '../models/index';

require('dotenv').config();

const AuthorizationController = {
  // eslint-disable-next-line arrow-body-style
  getToken: (req) => {
    return req.headers.authorization ?
       req.headers.authorization.split(' ')[1] : '';
  },

  isAuthorized: (req, res, next) => {
    if (jwt.verify(AuthorizationController.getToken(req, res), process.env.SECRET_KEY,
     (err, decoded) => {
       if (err) {
         return res.status(401).json({ err: 'Token expired' });
       }
       req.decoded = decoded;
       next();
     }));
  },

  isAdmin: (req, res, next) => {
    User.findOne({
      where: {
        id: req.decoded.id
      }
    })
    .then((user) => {
      user.getRole()
      .then((role) => {
        if (role.title === 'admin') {
          next();
        } else {
          res.status(403)
          .json({ error: 'Only an admin can perform this action' });
        }
      })
      .catch((error) => {
        res.status(401).json({ error: error.message });
      });
    });
  },

  isOwner: (req, res, next) => {
    const decodedToken = jwt.decode(AuthorizationController.getToken(req, res));
    Document.find({
      where: {
        id: req.params.id
      }
    })
    .then((document) => {
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
