'use strict';
module.exports = function(sequelize, DataTypes) {
  const Document = sequelize.define('Document', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    content:{
      type: DataTypes.STRING,
      allowNull: false
    },
    access: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isIn: [['public', 'private', 'role']],
      }
    },
    publish_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Document.belongsTo(models.User, {
          foreignKey: 'user_id',
          onDelete: 'CASCADE',
        });
        Document.belongsTo(models.Role, {
          foreignKey: 'role_id',
          onDelete: 'CASCADE',
        });
    }
  }
  });
  return Document;
};
