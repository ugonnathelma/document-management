import 'babel-polyfill';
import dotenv from 'dotenv';
import db from '../../server/models';
import roleFixtures from '../role-fixtures';

dotenv.config();

const expect = require('chai').expect;

process.env.NODE_ENV = 'test';

const Role = db.Role;

describe('Roles Model', () => {
  after((done) => {
    db.User.sync({ force: true })
    .then(() => {
      db.Role.destroy({
        where: {
          $or: [
            { title: roleFixtures.testRole.title },
            { title: roleFixtures.otherTestRole.title }
          ]
        }
      }).then(() => {
        done();
      });
    });
  });

  let role;

  describe('Create Role', () => {
    it('should create new role', (done) => {
      Role.create(roleFixtures.testRole)
        .then((newRole) => {
          expect(newRole).to.be.ok;
          expect(newRole).to.be.defined;
          role = newRole;
          done();
        });
    });

    it('created new role should have title', (done) => {
      expect(role.title).to.defined;
       expect(role.title).to.be.ok;
      done();
    });


    describe('Role Validation', () => {
      it('requires all required fields to create role', (done) => {
        expect(Role.create(roleFixtures.incompleteRole)).to.be.defined;
        expect(Role.create(roleFixtures.incompleteRole)).to.be.ok;
        done();
      });
    });
  });
});
