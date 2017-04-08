import { Role } from '../models/index';

const RoleController = {

  createRole: (req, res) => {
    Role.create({
      title: req.body.title
    })
      .then((role) => {
        res.status(201).json(role);
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
      .then((role) => {
        res.status(200, 'Role Deleted').json(role);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  },

  editRole: (req, res) => {
    Role.findOne({
      where: {
        id: req.params.id
      }
    })
      .then((role) => {
        role.title = req.body.title;
        role.save()
        .then(() => {
          res.status(200, 'Role Updated').json(role);
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  },

  findRole: (req, res) => {
    Role.findOne({ where: { id: req.params.id } })
    .then((role) => {
      res.status(200).json(role);
    }).catch((err) => {
      res.status(404).json({ error: err.message });
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
