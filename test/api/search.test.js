import 'babel-polyfill';
import chai from 'chai';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import models from '../../server/models';
import documentFixtures from './document-fixtures';
import userFixtures from './user-fixtures';
import app from '../../server';

dotenv.config();

const expect = chai.expect;
const JWT_SECRET = process.env.SECRET_KEY;
const adminToken = jwt.sign(userFixtures.existingAdminUser, JWT_SECRET);
const users = [userFixtures.adminUser, userFixtures.existingAdminUser, userFixtures.regularUser, userFixtures.secondRegularUser, userFixtures.existingRegularUser];

describe('Search', () => {
  before(function (done) {
    this.timeout(10000);
    models.User.bulkCreate(users)
    .then(() => {
      done();
    });
  });

  afterEach((done) => {
    models.Document.sync({ force: true })
    .then(() => {
      done();
    });
  });

  after(function (done) {
    this.timeout(10000);
    models.Role.destroy({
      where: {
        $not: {
          $or: [
          { title: 'admin' },
          { title: 'regular' }]
        }
      }
    })
    .then(() => {
      models.User.sync({ force: true })
    .then(() => {
      models.Document.sync({ force: true })
      .then(() => {
        done();
      });
    });
    });
  });

  it('should validate that all documents returned, given a search criteria, can be limited by a specified number, ordered by published date and were created by a specified role',
  (done) => {
    const testDocuments = documentFixtures.createNonRandomDocuments(users);
    models.Document.bulkCreate(testDocuments)
    .then(() => {
      supertest(app)
      .get('/api/v1/search/documents/')
      .query({ query: testDocuments[0].title })
      .set('authorization', `token ${adminToken}`)
      .end((err, res) => {
        expect(res.body[0].content).to.equal(testDocuments[0].content);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  it('should validate that all documents returned, can be limited by a specified number and were published on a certain date', (done) => {
    const testDocuments = documentFixtures.createDifferentDateDocuments(users);
    models.Document.bulkCreate(testDocuments)
    .then(() => {
      supertest(app)
      .get('/api/v1/search/documents/')
      .query({ query: 'document', publish_date: new Date(), limit: 1 })
      .set('authorization', `token ${adminToken}`)
      .end((err, res) => {
        expect(res.body[0].title).to.equal(testDocuments[4].title);
        expect(res.body[0].content).to.equal(testDocuments[4].content);
        expect(res.body).to.have.lengthOf(1);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });
});

