import 'babel-polyfill';
import chai from 'chai';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import models from '../../../server/models';
import userFixtures from '../user-fixtures';
import roleFixtures from '../role-fixtures';
import app from '../../../server';

dotenv.config();

const expect = chai.expect;

const JWT_SECRET = process.env.SECRET_KEY;

const adminToken = jwt.sign(userFixtures.existingAdminUser, JWT_SECRET);
const regularToken = jwt.sign(userFixtures.existingRegularUser, JWT_SECRET);

describe('Role', () => {
  before((done) => {
    models.User.bulkCreate([userFixtures.existingAdminUser,
    userFixtures.existingRegularUser])
    .then(() => {
      done();
    });
  });


  after((done) => {
    models.User.sync({ force: true })
    .then(() => {
      models.Role.destroy({
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

  it('should verify that admin role exist in the database', (done) => {
    models.Role.findAll()
    .then((roles) => {
      expect(roles[0].title).to.equal('admin');
      done();
    });
  });

  it('should verify that regular role exist in the database', (done) => {
    models.Role.findAll()
    .then((roles) => {
      expect(roles[1].title).to.equal('regular');
      done();
    });
  });

  it('should verify admins can create a role', (done) => {
    supertest(app)
    .post('/api/v1/roles')
    .send(roleFixtures.testRole)
    .set('authorization', `token ${adminToken}`)
    .end((err, res) => {
      expect(res.statusCode).to.equal(201);
      done();
    });
  });

  it('should verify regular users can not create a role', (done) => {
    supertest(app)
    .post('/api/v1/roles')
    .send(roleFixtures.testRole)
    .set('authorization', `token ${regularToken}`)
    .end((err, res) => {
      expect(res.statusCode).to.equal(403);
      expect(res.body.error).to.equal('Only an admin can perform this action');
      done();
    });
  });

  it('should not create duplicate roles', (done) => {
    supertest(app)
    .post('/api/v1/roles')
    .send(roleFixtures.otherTestRole)
    .set('authorization', `token ${adminToken}`)
    .end((err, res) => {
      expect(res.statusCode).to.equal(201);
      supertest(app)
        .post('/api/v1/roles')
        .send(roleFixtures.otherTestRole)
        .set('authorization', `token ${adminToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(500);
          done();
        });
    });
  });

  it('should not create a role missing the title field', (done) => {
    supertest(app)
    .post('/api/v1/roles')
    .send(roleFixtures.incompleteRole)
    .set('authorization', `token ${adminToken}`)
    .end((err, res) => {
      expect(res.statusCode).to.equal(500);
      done();
    });
  });

  it('should verify that only the admin can view all roles', (done) => {
    supertest(app)
      .get('/api/v1/roles')
      .set('authorization', `token ${adminToken}`)
      .end((err, res) => {
        expect(res.body).to.have.lengthOf(4);
        done();
      });
  });

  it('should verify that regular users can not view all roles', (done) => {
    supertest(app)
      .get('/api/v1/roles')
      .set('authorization', `token ${regularToken}`)
      .end((err, res) => {
        expect(res.body.error).to.equal('Only an admin can perform this action');
        done();
      });
  });
});
