import chai from 'chai';
import supertest from 'supertest';
import app from '../../server';

const expect = chai.expect;



describe('Authentication', () => {
  describe('User token', () => {
    it('should return unauthorised if no user token is specified', (done) => {
      supertest(app)
        .get('/api/v1/documents')
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          done();
        });
    });

    it('should return unauthorised if user token is not correct', (done) => {
      supertest(app)
        .get('/api/v1/documents')
        .set('Authorization', 'Authorization').expect(401)
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          done();
        });
    });
  });
});
