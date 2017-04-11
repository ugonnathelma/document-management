require('dotenv').config();

module.exports = {
  development: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DB_DEV,
    host: process.env.HOST,
    dialect: 'postgres'
  },
  test: {
    username: '',
    password: '',
    database: process.env.DB_TEST,
    host: process.env.HOST,
    dialect: 'postgres'
  },
  production: {
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL'
  }
};

