'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('documents', { id: Sequelize.INTEGER });
    */
    queryInterface.createTable(
  'documents',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    user_id: {
      type: Sequelize.INTEGER
    },
    content: {
      type: Sequelize.STRING
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  },
  {
    engine: 'MYISAM',                     // default: 'InnoDB'
    charset: 'latin1',                    // default: null
    schema: 'public'                      // default: public, PostgreSQL only.
  }
)
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('documents');
    */

    queryInterface.dropTable('documents')
  }
};
