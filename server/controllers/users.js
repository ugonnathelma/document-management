import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/index';

require('dotenv').config();


class UserController {

  static login(req, res) {
    User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        bcrypt.compare(req.body.password, user.password_digest, (err, same) => {
          const token = jwt.sign({ user }, process.env.SECRET_KEY,
          { expiresIn: '1h' });
          res.status(200).json({ success: same, token });
        });
      })
      .catch((err) => {
        res.status(404).json({ error: err.message });
      });
  }

  static createUser(req, res) {
    User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      password_confirmation: req.body.password_confirmation,
      role_id: req.body.role_id || 2
    })
      .then((user, err) => {
        if (err) {
          res.status(400).json({ error: err.message });
        } else {
          const token = jwt.sign({ user },
          process.env.SECRET_KEY, { expiresIn: '1h' });
          res.status(201).json({ user, token });
        }
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  }

  static getUsers(req, res) {
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
    User.all(queryParams)
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }

  static findUser(req, res) {
    User.findOne({ where: { id: req.params.id } }).then((user) => {
      res.status(200).json(user);
    }).catch((err) => {
      res.status(404).json({ error: err.message });
    });
  }

  static updateUserInfo(req, res) {
    if (req.decoded) {
      User.find({
        where: {
          id: req.decoded.id
        }
      })
      .then((user) => {
        if (user) {
          user.name = req.body.name;
          user.password = req.body.password;
          user.password_confirmation = req.body.password_confirmation;
          user.save()
            .then((err) => {
              if (err) {
                return res.status(500).json({ error: err.message });
              }
                //  "User Information Updated"
              return res.status(200).json(req.body);
            })
            .catch((err) => {
              res.status(500).json({ error: err.message });
            });
        }
      });
    }
  }

  static deleteUser(req, res) {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then((user, err) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.status(200, 'User Deleted').json(user);
        }
      });
  }

  static searchUsers(req, res) {
    if (req.query.q) {
      User.findAll({
        where: {
          name: {
            $iLike: `%${req.query.q}%`
          }
        }
      })
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
    } else {
      res.status(500).json({ error: 'Search query not found' });
    }
  }
}

module.exports = UserController;
