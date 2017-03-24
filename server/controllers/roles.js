import { Role } from '../models/index';

const RoleController = {

  createRole: (req, res) => {
    Role.create({
      title: req.body.title
    })
    .then((role, err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json(role);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
  },

  deleteRole: (req, res) => {
    Role.destroy({
      where: {
        id: req.params.id
      }
    })
    .then((role, err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200, 'Role Deleted').json(role);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
  },

  getRoles: (req, res) => {
    Role.all()
     .then((roles) => {
       res.status(200).json(roles);
     })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }
};

module.exports = RoleController;
