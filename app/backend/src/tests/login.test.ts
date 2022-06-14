import * as sinon from 'sinon';
import * as chai from 'chai';
import { before, after } from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/users';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Endpoint /login', () => {
  const userValid = {
    id: 1,
    username: 'valid_user',
    role: 'user',
    email: 'admin@admin.com',
    password: '$2a$12$3.vVVBUOUeW4QmTyzgaDbuhMDtfrmNDgCUa21PLIvJ9R0BB/bhpfS',
  }
    let chaiHttpResponse: Response;
  
      before(() => {
        sinon
          .stub(Users, "findOne")
          .resolves(userValid as Users);
      });
  
      after(() => {
        (Users.findOne as sinon.SinonStub).restore();
      });
  
      it('Verificará se é possível fazer o login com dados corretos, no formato Json e na rota POST /login', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .type('json')
          .send({
            email: 'admin@admin.com',
            password: '1234567',
          });
  
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse).to.be.json;
        expect(chaiHttpResponse.body).to.not.have.property('password');
        expect(chaiHttpResponse.body).to.have.property('user');
        expect(chaiHttpResponse.body).to.have.property('token');
      });

      it('Verificará NÃO É possível fazer o login com dados corretos INCORRETOS, na rota POST /login', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: '123456',
        });

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect password');
      expect(chaiHttpResponse.body).to.have.property('message');
     });

     it('Verificará o acesso com o token válido, na rota GET /login/validate', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InJvbGUiOiJhZG1pbiIsImlkIjoxfSwiaWF0IjoxNjU1MTQwNjgzLCJleHAiOjE2NTU3NDU0ODN9.xXsv7IshnVZtT9183_pxwmFYi4pF9J6UQttQ1zqAyp8')

      expect(chaiHttpResponse.status).to.be.equal(200);
    });

    it('Verificará se é possível fazer o login sem email, na rota POST /login', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          password: '1234567',
        });

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
      expect(chaiHttpResponse.body).to.have.property('message');
    });

    it('Verificará o acesso com sem o token, na rota GET /login/validate', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', '')

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body.message).to.be.equal('Invalid Token');
      expect(chaiHttpResponse.body).to.have.property('message');
    });

    it('Verificará o acesso com o token Inválido , na rota GET /login/validate', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', '9eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InJvbGUiOiJhZG1pbiIsImlkIjoxfSwiaWF0IjoxNjU1MTQwNjgzLCJleHAiOjE2NTU3NDU0ODN9.xXsv7IshnVZtT9183_pxwmFYi4pF9J6UQttQ1zqAyp8')

      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body).to.have.property('message');
    });
});
