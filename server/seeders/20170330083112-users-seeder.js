const bcrypt = require('bcrypt-nodejs');

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('Users', [
      { first_name: 'Ugonna',
        last_name: 'Ofoegbu',
        username: 'SuperAdmin',
        email: 'admin@admin.com',
        password_digest: bcrypt.hashSync('123456'),
        role_id: '1',
        createdAt: new Date(),
        updatedAt: new Date() },
    ]);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
