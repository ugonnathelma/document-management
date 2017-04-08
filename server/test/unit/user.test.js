import 'babel-polyfill';
import dotenv from 'dotenv';
import db from '../../../server/models';
import userFixtures from '../user-fixtures';

dotenv.config();

const expect = require('chai').expect;

process.env.NODE_ENV = 'test';

const User = db.User;

describe('Users Model', () => {
  afterEach((done) => {
    db.User.sync({ force: true })
    .then(() => {
      done();
    });
  });

  let user;

  describe('Create User', () => {
    it('should create new user', (done) => {
      User.create(userFixtures.regularUser)
        .then((newUser) => {
          expect(newUser).to.be.ok;
          expect(newUser).to.be.defined;
          user = newUser;
          done();
        });
    });

    it('created new user should have first_name, last_name, email, username', (done) => {
      expect(user.first_name).to.defined;
      expect(user.first_name).to.defined;
      expect(user.username).to.be.defined;
      expect(user.email).to.be.defined;
      done();
    });
  });
});
