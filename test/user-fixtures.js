const faker = require('faker');

const adminPassword = faker.internet.password();
const regularPassword = faker.internet.password();
const secondRegularPassword = faker.internet.password();

export default {
  adminUser: {
    id: faker.random.number({ max: 100, min: 1 }),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: adminPassword,
    password_confirmation: adminPassword,
    role_id: 1
  },
  regularUser: {
    id: faker.random.number({ max: 100, min: 1 }),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: regularPassword,
    password_confirmation: regularPassword,
    role_id: 2
  },
  secondRegularUser: {
    id: faker.random.number({ max: 100, min: 1 }),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: secondRegularPassword,
    password_confirmation: secondRegularPassword,
    role_id: 2
  },
  existingAdminUser: {
    id: faker.random.number({ max: 100, min: 1 }),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: adminPassword,
    password_confirmation: adminPassword,
    role_id: 1
  },
  existingRegularUser: {
    id: faker.random.number({ max: 100, min: 1 }),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: regularPassword,
    password_confirmation: regularPassword,
    role_id: 2
  },
  incompleteUser: {
    first_name: faker.name.firstName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: regularPassword,
    password_confirmation: regularPassword,
    role_id: 2
  }
};
