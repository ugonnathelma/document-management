import jwt from 'jsonwebtoken';
import { User } from '../models/index';

require('dotenv').config();

const AuthorizationController = {
  // eslint-disable-next-line arrow-body-style
  getToken: (req) => {
    return req.headers.authorization ?
       req.headers.authorization.split(' ')[1] : null;
  },
  isValidToken: (req, res) => {
    return jwt.verify(AuthorizationController.getToken(req, res), process.env.SECRET_KEY, (err) => {
      return err ? res.status(401).json({ err: 'Token expired' }) : res.status(200).json({ message: 'token ok' });
    });
  },

  isAuthorized: (req, res, next) => {
    jwt.verify(AuthorizationController.getToken(req, res), process.env.SECRET_KEY,
     (err, decoded) => {
       if (err) {
         return res.status(401).json({ err });
       }
       req.decoded = decoded;
       next();
     });
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
  }
};

module.exports = AuthorizationController;
