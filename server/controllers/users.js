const User = require("../models/index.js").User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class UserController {

  static login(req, res) {

    let email = req.body.email;

    User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        bcrypt.compare(req.body.password, user.password_digest, (err, same) => {

          let token = jwt.sign({ user: user }, 'textbooksecret', { expiresIn: '1h' });
          res.status(200).json({ success: same, token: token });
        });
      })
      .catch((err) => {
        res.status(404).json({ error: "User email not found" });
      })
  }

  static createUser(req, res) {

    let user = User.build({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password_confirmation: req.body.password_confirmation,
      role_id: req.body.role_id
    });
    user.save()
      .then((user, err) => {
        if (err) {
          res.status(500).json({ error: err.message })
        } else {
          res.status(200, "User Created").json(user);
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
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
      })
  }

  static findUser(req, res) {
    User.findOne({ where: { id: req.params.id } }).then((user) => {
      res.status(200).json(user);
    }).catch((err) => {
      res.status(404).json({ error: err.message });
    })
  }

  static updateUserInfo(req, res) {
    User.find({
      where: {
        id: req.params.id
      }
    })
      .then((user, err) => {
        if (user) {
          user.name = req.body.name;
          user.password = req.body.password;
          user.password_confirmation = req.body.password_confirmation;
          user.save()
            .then((user, err) => {
              if (err) {
                return res.status(500).json({ error: err.message });
              } else {
                //  "User Information Updated"
                return res.status(200).json(req.body);
              }
            })
            .catch((err) => {
              res.status(500).json({ error: err.message });
            })
        }
      })

  }

  static deleteUser(req, res) {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then((user, err) => {
        if (err) {
          res.status(500).json({ error: err.message })
        } else {
          res.status(200, "User Deleted").json(user);
        }
      });
  }

  static searchUsers(req, res) {
    if(req.query.q)
    {
      User.findAll({
        where: {
          name : {
            $iLike : `%${req.query.q}%`
          }
        }
      })
      .then((users) => {
        res.status(200).json(users);
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

module.exports = UserController;
