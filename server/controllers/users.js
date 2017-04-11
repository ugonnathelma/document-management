import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import { User, Role } from '../models/index';

require('dotenv').config();

const PAGE_LIMIT = 10;
const PAGE_OFFSET = 0;

/** Class to manage user database requests. */
const UserController = {
  /**
   * login
   * Login a user
   * @param {any} req Request Object
   * @param {any} res Response Object
   * @return {any} Response Status
   */
  login(req, res) {
    User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (user) {
          bcrypt.compare(req.body.password, user.password_digest, (err, same) => {
            const userData = {
              id: user.dataValues.id,
              username: user.dataValues.username,
              first_name: user.dataValues.first_name,
              last_name: user.dataValues.last_name,
              email: user.dataValues.email,
              role_id: user.dataValues.role_id
            };
            const token = jwt.sign({ user: userData }, process.env.SECRET_KEY,
              { expiresIn: '1h' });
            if (same) {
              res.status(200).json({ success: same, token });
            } else {
              res.status(401)
              .json({ error: 'Email and Password combination not correct' });
            }
          });
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  },
  /**
   * createUser
   * Create a new user
   * @param {any} req Request Object
   * @param {any} res Response Object
   * @return {any} Response Status
   */
  createUser(req, res) {
    User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      password_confirmation: req.body.password_confirmation,
      role_id: req.body.role_id || 2
    })
      .then((user) => {
        const userData = {
          id: user.dataValues.id,
          username: user.dataValues.username,
          first_name: user.dataValues.first_name,
          last_name: user.dataValues.last_name,
          email: user.dataValues.email,
          role_id: user.dataValues.role_id
        };
        const token = jwt.sign({ user: userData },
          process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(201).json({ user: userData, token });
      })
      .catch((err) => {
        res.status(500).json({ error: err.errors[0].type });
      });
  },

  /**
   * getUsers
   * Get all users
   * @param {any} req Request Object
   * @param {any} res Response Object
   * @return {any} Response Status
   */
  getUsers(req, res) {
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
    User.findAndCountAll(queryParams)
      .then((users) => {
        res.status(200).json({ users: users.rows,
          pageCount: Math.ceil(users.count / queryParams.limit) });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  },

  /**
   * findUser
   * Get a particular user
   * @param {any} req Request Object
   * @param {any} res Response Object
   * @return {any} Response Status
   */
  findUser(req, res) {
    User.findOne({
      where: { id: req.params.id },
      include: [{ model: Role }]
    })
    .then((user) => {
      const userData = {
        id: user.dataValues.id,
        username: user.dataValues.username,
        first_name: user.dataValues.first_name,
        last_name: user.dataValues.last_name,
        email: user.dataValues.email,
        role: user.Role.dataValues.title
      };
      res.status(200).json(userData);
    }).catch((err) => {
      res.status(404).json({ error: err.message });
    });
  },

  /**
   * updateUserInfo
   * Change details of a user
   * @param {any} req Request Object
   * @param {any} res Response Object
   * @return {any} Response Status
   */
  updateUserInfo(req, res) {
    if (req.decoded) {
      User.find({
        where: {
          id: req.params.id
        }
      })
        .then((user) => {
          if (user) {
            const bodyKeys = Object.keys(req.body);

            bodyKeys.forEach((key) => {
              if (req.body[key] && key !== 'password' && key
              !== 'password_confirmation') {
                user[key] = req.body[key];
              }
            });

            user.save()
              .then(() => {
                return res.status(200).json(req.body);
              })
              .catch((err) => {
                res.status(500).json({ error: err.message });
              });
          }
        });
    }
  },
  /**
   * changePassword
   * Change user password
   * @param {any} req Request Object
   * @param {any} res Response Object
   * @return {any} Response Status
   */
  changePassword(req, res) {
    if (req.decoded) {
      User.find({
        where: {
          id: req.params.id
        }
      })
        .then((user) => {
          if (user) {
            bcrypt.compare(req.body.oldPassword, user.password_digest, (err, same) => {
              if (err) {
                res.status(500).json({ error: err.message });
              }
              if (req.body.password && req.body.password_confirmation) {
                user.password = req.body.password;
                user.password_confirmation = req.body.password_confirmation;
              }
              user.save()
              .then(() => {
                return res.status(200).json(req.body);
              })
              .catch((err) => {
                res.status(500).json({ error: err.message });
              });
            });
          }
        });
    }
  },

  /**
   * deleteUser
   * Delete a user
   * @param {any} req Request Object
   * @param {any} res Response Object
   * @return {any} Response Status
   */
  deleteUser(req, res) {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then((user) => {
        res.status(200, 'User Deleted').json(user);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  },

  /**
   * searchUsers
   * Search for users
   * @param {any} req Request Object
   * @param {any} res Response Object
   * @return {any} Response Status
   */
  searchUsers(req, res) {
    const queryParams = {
      limit: req.query.limit || PAGE_LIMIT,
      offset: req.query.offset || PAGE_OFFSET
    };
    if (req.query.query) {
      User.findAndCountAll({
        where: {
          $or: [
            {
              first_name: {
                $iLike: `%${req.query.query}%`
              }
            },
            {
              last_name: {
                $iLike: `%${req.query.query}%`
              }
            },
            {
              username: {
                $iLike: `%${req.query.query}%`
              }
            }
          ]
        },
        limit: queryParams.limit,
        offset: queryParams.offset
      })
        .then((users) => {
          res.status(200).json({ users: users.rows || [],
            pageCount: Math.ceil(users.count / queryParams.limit) || 0 });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    } else {
      res.status(400).json({ error: 'Search query not found' });
    }
  }
};

module.exports = UserController;
