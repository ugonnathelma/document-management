'use strict';

require('dotenv').config();
console.log(process.env);

module.exports = {
  development: {
    username: '',
    password: '',
    database: 'database_development',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB,
    host: process.env.TEST_DB_HOST,
    dialect: 'postgres'
  },
  production: {
    username: '',
    password: '',
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL'
  }
};