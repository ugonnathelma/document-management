'use strict';
module.exports = function(sequelize, DataTypes) {
  const Document = sequelize.define('Document', {
    title: {
      type: DataTypes.STRING,
      allowNull : false
    },
    content:
    {
      type: DataTypes.STRING,
      allowNull: false
    },
    access: {
      type: DataTypes.ENUM('public', 'private', 'shared'),
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Document.belongsTo(models.User, {
          foreignKey: 'user_id',
          onDelete: 'CASCADE',
        });
    }
  }
  });
  return Document;
};
