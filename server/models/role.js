'use strict';

module.exports = function (sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        // associations can be defined here
        Role.hasOne(models.User, {
          foreignKey: 'role_id'
        });
      }
    }
  });
  return Role;
};