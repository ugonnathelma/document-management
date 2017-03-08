'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
   queryInterface.addColumn("Users", "username", {
     type: Sequelize.STRING,
     unique: true
   });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn("Users", "username");
  }
};
