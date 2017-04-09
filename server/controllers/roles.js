import { Role } from '../models/index';

/** Class to manage role database requests. */
const RoleController = {
  /**
   * createRole
   * Create a new role
   * @param {any} req
   * @param {any} res
   * @return {any} none
   */
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

  /**
   * deleteRole
   * Delete a role
   * @param {any} req
   * @param {any} res
   * @return {any} none
   */
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

  /**
   * editRole
   * Change role title
   * @param {any} req
   * @param {any} res
   * @return {any} none
   */
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

  /**
   * findRole
   * Get a particular role
   * @param {any} req
   * @param {any} res
   * @return {any} none
   */
  findRole: (req, res) => {
    Role.findOne({ where: { id: req.params.id } })
    .then((role) => {
      res.status(200).json(role);
    }).catch((err) => {
      res.status(404).json({ error: err.message });
    });
  },

  /**
   * getRoles
   * Get all roles
   * @param {any} req
   * @param {any} res
   * @return {any} none
   */
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
