import jwt from 'jsonwebtoken';
import model from '../../models/';
import app from '../../../server';

const secret = process.env.SECRET || 'secrettestkey';

export default {
  verifyToken(req, res, next) {
    const token = req.headers.authorization ||
      req.headers['x-access-token'];
    if (!token) {
      return res.status(401)
        .send({ message: 'Not Authorized' });
    }

    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        return res.status(401)
          .send({ message: 'Invalid Token' });
      }

      req.decoded = decoded;
      next();
    });
  },

  adminAccess(req, res, next) {
    model.Roles.findById(req.decoded.data.roleId)
      .then((foundRole) => {
        if (foundRole.title.toLowerCase() === 'administrator') {
          next();
        } else {
          return res.status(403)
            .send({ message: 'User is unauthorized for this request.' });
        }
      })
      .catch(error => res.status(400).send({
        err: error,
        message: 'Error authenticating'
      }));
  },
};

// import chai from 'chai';
// import supertest from 'supertest';
// import app from '../../../server';

// const expect = chai.expect;



// describe('Authentication', () => {
//   describe('User token', () => {
//     it('should return unauthorised if no user token is specified', (done) => {
//       supertest(app)
//         .get('/api/v1/documents')
//         .end((err, res) => {
//           expect(res.statusCode).to.equal(401);
//           done();
//         });
//     });

//     it('should return unauthorised if user token is not correct', (done) => {
//       supertest(app)
//         .get('/api/v1/documents')
//         .set('Authorization', 'Authorization').expect(401)
//         .end((err, res) => {
//           expect(res.statusCode).to.equal(401);
//           done();
//         });
//     });
//   });
// });
