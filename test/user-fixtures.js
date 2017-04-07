const faker = require('faker');

const adminPassword = faker.internet.password();
const regularPassword = faker.internet.password();
const secondRegularPassword = faker.internet.password();

export default {
  adminUser: {
    id: faker.random.number({ max: 100, min: 1 }),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    username: 'adminUser',
    email: 'admin@user.com',
    password: adminPassword,
    password_confirmation: adminPassword,
    role_id: 1
  },
  regularUser: {
    id: faker.random.number({ max: 100, min: 1 }),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    username: 'regularUser',
    email: 'regular@user.com',
    password: regularPassword,
    password_confirmation: regularPassword,
    role_id: 2
  },
  secondRegularUser: {
    id: faker.random.number({ max: 100, min: 1 }),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    username: 'secondRegularUser',
    email: 'secondRegular@user.com',
    password: secondRegularPassword,
    password_confirmation: secondRegularPassword,
    role_id: 2
  },
  existingAdminUser: {
    id: faker.random.number({ max: 100, min: 1 }),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    username: 'existingAdminUser',
    email: 'existingAdmin@user.com',
    password: adminPassword,
    password_confirmation: adminPassword,
    role_id: 1
  },
  existingRegularUser: {
    id: faker.random.number({ max: 100, min: 1 }),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    username: 'existingRegularUser',
    email: 'existingRegular@user.com',
    password: regularPassword,
    password_confirmation: regularPassword,
    role_id: 2
  },
  incompleteUser: {
    first_name: faker.name.firstName(),
    username: 'incompleteUser',
    email: 'incomplete@user.com',
    password: regularPassword,
    password_confirmation: regularPassword,
    role_id: 2
  },
  invalidUser: {
    first_name: faker.name.firstName(),
    username: '     ',
    email: 'incomplete@user.com',
    password: regularPassword,
    password_confirmation: regularPassword,
    role_id: 2
  }
};
