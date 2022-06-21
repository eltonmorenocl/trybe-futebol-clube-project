import * as sinon from 'sinon';
import * as chai from 'chai';
import { before, after } from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/matches';

import { Response } from 'superagent';
import { matchesData } from './matches';

chai.use(chaiHttp);

const { expect } = chai;

describe('Endpoint /matches', () => {
  
  const fakeCreate = {
    "homeTeam": 16,
    "awayTeam": 1,
    "homeTeamGoals": 2,
    "awayTeamGoals": 2,
    "inProgress": true
  }

    let chaiHttpResponse: Response;
  
      before(() => {
        sinon
          .stub(Matches, "findAll")
          .resolves(matchesData as []);
        sinon
          .stub(Matches, "findByPk")
          .resolves(matchesData as unknown as Matches);
          sinon
          .stub(Matches, "create")
          .resolves(fakeCreate as unknown as Matches);    
      });
  
      after(() => {
        (Matches.findAll as sinon.SinonStub).restore();
        (Matches.findByPk as sinon.SinonStub).restore();
        (Matches.create as sinon.SinonStub).restore();
      });
  
      it('Verificará se retorna todos os jogos na na rota GET /matches', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get('/matches')
  
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse).to.be.an('object');
        expect(chaiHttpResponse.body[0]).to.have.property('id');
        expect(chaiHttpResponse.body[0]).to.have.property('homeTeam');
      });

      it('Verifica se e possível buscar por parametro InProgress na rota GET /matches', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get('/matches?inProgress=true');
  
        expect(chaiHttpResponse.status).to.equal(200);
        expect(chaiHttpResponse.body).to.be.an('array');
      });

      it('Verifica se é possivel editar na rota PATCH /matches', async () => {
        const chaiHttpResponse = await chai
          .request(app)
          .patch(`/matches/11/finish`)
  
        expect(chaiHttpResponse.status).to.equal(200);
        expect(chaiHttpResponse.body).to.be.an('object');
        expect(chaiHttpResponse.body).to.have.property('message');
        expect(chaiHttpResponse.body.message).to.equal('Finished');
      });

      it('Verifica se possível criar um novo jogo na rota POST /matches', async () => {
        const chaiHttpResponse = await chai
          .request(app)
          .post('/matches')
          .send({
            "homeTeam": 16,
            "awayTeam": 1,
            "homeTeamGoals": 2,
            "awayTeamGoals": 2,
            "inProgress": true
          });
  
        expect(chaiHttpResponse.status).to.equal(201);
        expect(chaiHttpResponse.body).to.be.an('object');
        expect(chaiHttpResponse.body.inProgress).to.be.true;
      });
});
