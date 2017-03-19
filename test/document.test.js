import 'babel-polyfill';
import moment from 'moment';
import chai from 'chai';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import models from '../server/models';
import documentFixtures from './document-fixtures';
import userFixtures from './user-fixtures';
import roleFixtures from './role-fixtures';
import app from '../server';


dotenv.config();

const expect = chai.expect;

const JWT_SECRET = process.env.SECRET_KEY;

const adminToken = jwt.sign(userFixtures.existingAdminUser, JWT_SECRET);
const regularToken = jwt.sign(userFixtures.regularUser, JWT_SECRET);
const secondRegularToken = jwt.sign(userFixtures.secondRegularUser, JWT_SECRET);
const users = [userFixtures.adminUser, userFixtures.existingAdminUser, userFixtures.regularUser, userFixtures.secondRegularUser, userFixtures.existingRegularUser];

describe('Document', () => {
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

  it('should verify that a document created has a published date defined',
  (done) => {
    supertest(app)
    .post('/documents')
    .send(documentFixtures.publicDocument)
    .set('authorization', `token ${regularToken}`)
    .end((err, res) => {
      expect(res.statusCode).to.equal(201);
      // eslint-disable-next-line no-unused-expressions
      expect(res.body.createdAt).to.not.be.undefined;
      done();
    });
  });

  it('should verify that a document has a property “access” set as “public” by default', (done) => {
    supertest(app)
    .post('/documents')
    .send(documentFixtures.publicDocument)
    .set('authorization', `token ${regularToken}`)
    .end((err, res) => {
      expect(res.statusCode).to.equal(201);
      // eslint-disable-next-line no-unused-expressions
      expect(res.body.access).to.equal('public');
      done();
    });
  });

  it('should verify that the creator of a document can retrieve a file with “access” set as “private', (done) => {
    supertest(app)
    .post('/documents')
    .send(documentFixtures.privateDocument)
    .set('authorization', `token ${regularToken}`)
    .end((err, res) => {
      supertest(app)
      .get(`/documents/${res.body.id}`)
      .set('authorization', `token ${regularToken}`)
       .end((err, res) => {
         expect(res.statusCode).to.equal(200);
         done();
       });
    });
  });

  it('should verify that a non creator of a document cannot retrieve a file with “access” set as “private', (done) => {
    supertest(app)
    .post('/documents')
    .send(documentFixtures.privateDocument)
    .set('authorization', `token ${regularToken}`)
    .end((err, res) => {
      supertest(app)
      .get(`/documents/${res.body.id}`)
      .set('authorization', `token ${secondRegularToken}`)
       .end((err, res) => {
         expect(res.body).to.equal(null);
         done();
       });
    });
  });

  it('should verify that users with the same role as the creator, can access documents with property “access” set to “role”', (done) => {
    models.Role.create(roleFixtures.testRole)
    .then((role) => {
      models.User.update({
        role_id: role.id
      }, {
        where: {
          id: userFixtures.regularUser.id
        }
      }).then(() => {
        models.Document.create(Object.assign({}, documentFixtures.roleDocument,
        { role_id: role.id }))
        .then((document) => {
          const modifiedToken = jwt.sign(Object.assign({}, userFixtures.regularUser, { role_id: role.id }), JWT_SECRET);
          supertest(app)
          .get(`/documents/${document.id}`)
          .set('authorization', `token ${modifiedToken}`)
          .end((req, res) => {
            // eslint-disable-next-line no-unused-expressions
            expect(res.body).to.not.be.empty;
            // eslint-disable-next-line no-unused-expressions
            expect(res.body.content).to.not.be.empty;
            expect(res.statusCode).to.equal(200);
            done();
          });
        });
      });
    });
  }).timeout(10000);

  it('should verify that users with different role as the creator, cannot access documents with property “access” set to “role”', (done) => {
    models.Role.create(roleFixtures.otherTestRole)
    .then((role) => {
      models.User.update({
        role_id: role.id
      }, {
        where: {
          id: userFixtures.regularUser.id
        }
      }).then(() => {
        models.Document.create(Object.assign({}, documentFixtures.roleDocument,
        { role_id: role.id }))
        .then((document) => {
          supertest(app)
          .get(`/documents/${document.id}`)
          .set('authorization', `token ${regularToken}`)
          .end((req, res) => {
            // eslint-disable-next-line no-unused-expressions
            expect(res.body).to.be.null;
            // eslint-disable-next-line no-unused-expressions
            expect(res.statusCode).to.equal(200);
            done();
          });
        });
      });
    });
  });

  it('should verify that the documents are returned, limited by a specified number, when Documents.all is called with a query parameter limit', (done) => {
    models.Document.bulkCreate(documentFixtures.createDocuments(5, users))
      .then(() => {
        supertest(app)
        .get('/documents')
        .query({ limit: 3 })
        .set('authorization', `token ${adminToken}`)
        .end((err, res) => {
          expect(res.body).to.have.lengthOf(3);
          expect(res.statusCode).to.equal(200);
          done();
        });
      });
  }).timeout(10000);

  it('should verify that all documents are returned, limited by a specified number and starting from a particular id, when Documents.all is called with query parameters limit and offset', (done) => {
    const testDocuments = documentFixtures.createDocuments(4, users);
    models.Document.bulkCreate(testDocuments)
    .then(() => {
      supertest(app)
      .get('/documents')
      .query({ limit: 2, offset: 2 })
      .set('authorization', `token ${adminToken}`)
      .end((err, res) => {
        expect(res.body).to.have.lengthOf(2);
        expect(moment(res.body[0].publish_date).isBefore(res.body[1].publish_date)).to.equal(false);
        expect(moment(res.body[1].publish_date).isBefore(res.body[0].publish_date)).to.equal(true);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });
});

