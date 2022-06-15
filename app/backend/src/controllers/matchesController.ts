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
}

export default new MatchesController();
