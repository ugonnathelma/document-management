import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 6
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 6
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        min: 6
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    password_digest: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password_confirmation: {
      type: DataTypes.VIRTUAL,
      allowNull: false
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        User.belongsTo(models.Role, {
          foreignKey: 'role_id',
          onDelete: 'CASCADE'
        });
      }
    }
  });

  const hasSecurePassword = (user, options, callback) => {
    if (user.password !== user.password_confirmation) {
      throw new Error('Password confirmation does not match Password');
    }

    bcrypt.hash(user.get('password'), null, null, (err, hash) => {
      if (err) return callback(err);
      user.set('password_digest', hash);
      return callback(null, options);
    });
  };

  User.beforeCreate((user, options, callback) => {
    user.email = user.email.toLowerCase();
    if (user.password) {
      hasSecurePassword(user, options, callback);
    } else {
      return callback(null, options);
    }
  });

  User.beforeUpdate(function(user, options, callback) {
    user.email = user.email.toLowerCase();
    if (user.password) {
      hasSecurePassword(user, options, callback);
    } else {
      return callback(null, options);
    }
  });

  return User;
};
