'use strict';

module.exports = function (sequelize, DataTypes) {
  var Document = sequelize.define('Document', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    access: {
      type: DataTypes.ENUM('public', 'private', 'role'),
      allowNull: false
    },
    publish_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        // associations can be defined here
        Document.belongsTo(models.User, {
          foreignKey: 'user_id',
          onDelete: 'CASCADE'
        });
        Document.belongsTo(models.Role, {
          foreignKey: 'role_id',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Document;
};