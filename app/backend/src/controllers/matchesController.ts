import { Request, Response } from 'express';
import { IMatchesQuery } from '../interfaces/IMatches';
import MatchesServices from '../services/matchesService';

export class MatchesController {
  public matchesGetAll = async (req: Request, res: Response) => {
    try {
      const { inProgress } = req.query as IMatchesQuery;

      if (!inProgress) {
        const resultMatches = await MatchesServices.matchesFindAll();
        // console.log(resultMatches);
        if (!resultMatches) return res.status(401).json({ message: 'Incorrect matches' });
        return res.status(200).json(resultMatches);
      }
      // console.log('inprogress', inProgress);
      const resultMatchesProgress = await MatchesServices.matchesGetProgress(inProgress);
      if (!resultMatchesProgress) {
        return res.status(401).json({ message: 'Incorrect matches Progress' });
      }
      // console.log('controller resultMatchesProgress', resultMatchesProgress);
      return res.status(200).json(resultMatchesProgress);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  };

  public MatchesCreate = async (req: Request, res: Response) => {
    try {
      // const { authorization } = req.headers;
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
      if (homeTeam === awayTeam) {
        const message = 'It is not possible to create a match with two equal teams';
        return res.status(401).json({ message });
      }
      const createdMat = await MatchesServices.matchesCreate(
        { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress },
      );
      // console.log('createdMatches controller', createdMatches);
      return res.status(201).json(createdMat);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  };

  MatchesPatch = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const matchesFound = await MatchesServices.matchesUpdateId(Number(id));
      if (!matchesFound) {
        return res.status(404).json({ message: 'erro na edicao do jogo' });
      }
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  };

  MatchespatchId = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const matchesFound = await MatchesServices.matchesUpdate(
        Number(homeTeamGoals),
        Number(awayTeamGoals),
        Number(id),
      );
      if (!matchesFound) {
        return res.status(404).json({ message: 'erro na edicao do jogo' });
      }
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  };
}

export default new MatchesController();
