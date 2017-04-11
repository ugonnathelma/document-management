import 'babel-polyfill';
import dotenv from 'dotenv';
import db from '../../../server/models';
import documentFixtures from '../helpers/document-fixtures';

dotenv.config();

const expect = require('chai').expect;

process.env.NODE_ENV = 'test';

const Document = db.Document;

describe('Documents Model', () => {
  afterEach((done) => {
    db.Document.sync({ force: true })
    .then(() => {
      done();
    });
  });

  let document;

  describe('Create Document', () => {
    it('should create new document', (done) => {
      Document.create(documentFixtures.publicDocument)
        .then((newDocument) => {
          expect(newDocument).to.be.ok;
          expect(newDocument).to.be.defined;
          document = newDocument;
          done();
        });
    });
  });
});
