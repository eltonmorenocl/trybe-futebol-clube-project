import * as sinon from 'sinon';
import * as chai from 'chai';
import { before, after } from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/teams';
import teamsFindId from '../services/teamsServices';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Endpoint /teams', () => {
  const teamValid = [
    { id: 1, teamName: 'Avaí/Kindermann' },
    { id: 2, teamName: 'Bahia' },
    { id: 3, teamName: 'Botafogo' },
    { id: 4, teamName: 'Corinthians' },
    { id: 5, teamName: 'Cruzeiro' },
    { id: 6, teamName: 'Ferroviária' },
    { id: 7, teamName: 'Flamengo' },
    { id: 8, teamName: 'Grêmio' },
    { id: 9, teamName: 'Internacional' },
    { id: 10, teamName: 'Minas Brasília' },
    { id: 11, teamName: 'Napoli-SC' },
    { id: 12, teamName: 'Palmeiras' },
    { id: 13, teamName: 'Real Brasília' },
    { id: 14, teamName: 'Santos' },
    { id: 15, teamName: 'São José-SP' },
    { id: 16, teamName: 'São Paulo' },
  ];

  const teamValidId =  { id: 2, teamName: 'Bahia' };

    let chaiHttpResponse: Response;
  
      before(() => {
        sinon
          .stub(Teams, "findOne")
          .resolves(teamsFindId as unknown as Teams);
        sinon.stub(teamsFindId, 'teamsFindId')
          .resolves(teamValid[100] as unknown as Teams); 
      });
  
      after(() => {
        (Teams.findOne as sinon.SinonStub).restore();
        (teamsFindId.teamsFindId as sinon.SinonStub).restore();
      });
  
      it('Verificará se é possível buscar times na rota GET /Teams', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get('/teams')

        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse).to.be.json;
        expect(chaiHttpResponse.body).to.be.an('array');

      });
           
      it("Testa se apresenta erro com id que NÃO existe", async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get('/teams/100')

        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse).to.be.json;
        expect(chaiHttpResponse.body).to.be.an('object');
        expect(chaiHttpResponse.body).to.have.property('message');
        expect(chaiHttpResponse.body.message).to.be.equal('There is no team with such id!');
        });
});
